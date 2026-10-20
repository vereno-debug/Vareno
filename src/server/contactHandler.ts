export interface ContactFormData {
  fullName: string;
  email: string;
  companyName?: string;
  websiteUrl?: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  preferredContactMethod?: string;
  consent: boolean;
  _website_hp?: string; // Honeypot field (must remain empty)
}

export interface ContactResponse {
  success: boolean;
  configured: boolean;
  message: string;
  enquiryReference?: string;
  submittedAt?: string;
  errors?: Record<string, string>;
}

// In-memory rate limiting (sliding window: max 5 requests per IP in 10 minutes)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(clientIp: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxLimit = 5;

  const current = rateLimitMap.get(clientIp);
  if (!current || now > current.resetAt) {
    rateLimitMap.set(clientIp, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (current.count >= maxLimit) {
    return true;
  }

  current.count += 1;
  return false;
}

function sanitize(input: string | undefined): string {
  if (!input) return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // Strip basic HTML tags
    .slice(0, 3000); // Enforce max length
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email);
}

export async function processContactSubmission(
  body: unknown,
  clientIp = 'unknown'
): Promise<{ status: number; body: ContactResponse }> {
  // 1. Abuse & rate limiting check
  if (clientIp !== 'unknown' && isRateLimited(clientIp)) {
    return {
      status: 429,
      body: {
        success: false,
        configured: false,
        message: 'Too many enquiry attempts. Please wait 10 minutes before submitting again.',
      },
    };
  }

  if (!body || typeof body !== 'object') {
    return {
      status: 400,
      body: {
        success: false,
        configured: false,
        message: 'Invalid request payload received.',
      },
    };
  }

  const raw = body as Record<string, unknown>;

  // 2. Honeypot verification (Bots fill hidden fields)
  if (raw._website_hp && String(raw._website_hp).trim().length > 0) {
    // Silently reject spam bot submissions without revealing honeypot detection
    return {
      status: 200,
      body: {
        success: true,
        configured: true,
        message: 'Enquiry received.',
        enquiryReference: `VRN-${Date.now().toString(36).toUpperCase()}`,
      },
    };
  }

  // 3. Extract and sanitize inputs
  const fullName = sanitize(String(raw.fullName || ''));
  const email = sanitize(String(raw.email || ''));
  const companyName = sanitize(String(raw.companyName || ''));
  const websiteUrl = sanitize(String(raw.websiteUrl || ''));
  const projectType = sanitize(String(raw.projectType || ''));
  const budget = sanitize(String(raw.budget || ''));
  const timeline = sanitize(String(raw.timeline || ''));
  const description = sanitize(String(raw.description || ''));
  const preferredContactMethod = sanitize(String(raw.preferredContactMethod || 'Email'));
  const consent = Boolean(raw.consent);

  // 4. Server-side validation
  const errors: Record<string, string> = {};

  if (!fullName || fullName.length < 2) {
    errors.fullName = 'Please provide your full name (minimum 2 characters).';
  }

  if (!email || !isValidEmail(email)) {
    errors.email = 'Please provide a valid work email address.';
  }

  if (!projectType) {
    errors.projectType = 'Please select a project type.';
  }

  if (!budget) {
    errors.budget = 'Please select an estimated budget tier.';
  }

  if (!timeline) {
    errors.timeline = 'Please select your desired timeline.';
  }

  if (!description || description.length < 15) {
    errors.description = 'Please provide a brief description of your project or requirements (at least 15 characters).';
  }

  if (!consent) {
    errors.consent = 'Your consent is required to process your enquiry and respond.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: 422,
      body: {
        success: false,
        configured: false,
        message: 'Please review the highlighted fields and correct the validation errors.',
        errors,
      },
    };
  }

  const referenceId = `VRN-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;
  const submittedAt = new Date().toISOString();

  // 5. Inspect environment variables for Resend delivery
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || 'varenowebdesignstudio@gmail.com';
  const configuredFromEmail = process.env.CONTACT_FROM_EMAIL?.trim();

  const isConfigured = Boolean(
    resendApiKey &&
    resendApiKey !== 're_1234567890abcdef' &&
    resendApiKey.startsWith('re_') &&
    toEmail &&
    toEmail.includes('@') &&
    !toEmail.includes('yourdomain.com')
  );

  if (!isConfigured) {
    // Honest status reporting: do not fake delivery or pretend success
    console.warn(
      `[VARENO Server] Enquiry received (Ref: ${referenceId}) but email delivery is not configured. ` +
      `Set RESEND_API_KEY and CONTACT_TO_EMAIL in your environment for live inbox delivery.`
    );

    return {
      status: 200,
      body: {
        success: false,
        configured: false,
        enquiryReference: referenceId,
        submittedAt,
        message:
          'Enquiry details validated, but live inbox delivery is currently pending configuration. Please use the direct email link below to send your enquiry.',
      },
    };
  }

  // 6. Determine sender address adhering to Resend domain rules
  // Resend restricts unverified public webmail domains (like gmail.com, yahoo.com) from being sender addresses.
  // We use Resend's testing sender 'onboarding@resend.dev' during development or when using gmail,
  // and use the configured custom domain for production once verified in Resend.
  const isWebmailDomain = (emailStr: string) => {
    const domain = emailStr.split('@')[1]?.toLowerCase().replace(/>/, '').trim() || '';
    return ['gmail.com', 'googlemail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'].includes(domain);
  };

  let fromEmail = 'VARENO Enquiries <onboarding@resend.dev>';
  if (configuredFromEmail && !isWebmailDomain(configuredFromEmail)) {
    fromEmail = configuredFromEmail.includes('<') ? configuredFromEmail : `VARENO <${configuredFromEmail}>`;
  }

  // 7. Live dispatch via Resend API
  try {
    const emailSubject = `[VARENO Enquiry ${referenceId}] ${projectType} from ${fullName}`;
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #11130F; color: #F5F3ED; padding: 32px; border-radius: 8px; border: 1px solid #272B22;">
        <div style="border-bottom: 1px solid #272B22; padding-bottom: 20px; margin-bottom: 24px;">
          <h2 style="color: #D6F36A; margin: 0 0 6px 0; font-size: 20px; letter-spacing: 0.15em;">VARENO · NEW PROJECT ENQUIRY</h2>
          <p style="color: #9E9E94; margin: 0; font-size: 13px;">Ref: ${referenceId} · Received: ${new Date(submittedAt).toUTCString()}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; color: #9E9E94; width: 35%; font-size: 13px;">Full Name:</td>
            <td style="padding: 8px 0; color: #F5F3ED; font-weight: 600; font-size: 14px;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9E9E94; font-size: 13px;">Email Address:</td>
            <td style="padding: 8px 0; color: #D6F36A; font-weight: 600; font-size: 14px;"><a href="mailto:${email}" style="color: #D6F36A; text-decoration: none;">${email}</a></td>
          </tr>
          ${companyName ? `<tr><td style="padding: 8px 0; color: #9E9E94; font-size: 13px;">Company:</td><td style="padding: 8px 0; color: #F5F3ED; font-size: 14px;">${companyName}</td></tr>` : ''}
          ${websiteUrl ? `<tr><td style="padding: 8px 0; color: #9E9E94; font-size: 13px;">Current Website:</td><td style="padding: 8px 0; color: #F5F3ED; font-size: 14px;"><a href="${websiteUrl}" style="color: #9E9E94;" target="_blank">${websiteUrl}</a></td></tr>` : ''}
          <tr>
            <td style="padding: 8px 0; color: #9E9E94; font-size: 13px;">Project Type:</td>
            <td style="padding: 8px 0; color: #F5F3ED; font-weight: 600; font-size: 14px;">${projectType}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9E9E94; font-size: 13px;">Estimated Budget:</td>
            <td style="padding: 8px 0; color: #F5F3ED; font-weight: 600; font-size: 14px;">${budget}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9E9E94; font-size: 13px;">Desired Timeline:</td>
            <td style="padding: 8px 0; color: #F5F3ED; font-size: 14px;">${timeline}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #9E9E94; font-size: 13px;">Preferred Contact:</td>
            <td style="padding: 8px 0; color: #F5F3ED; font-size: 14px;">${preferredContactMethod}</td>
          </tr>
        </table>

        <div style="background: #181B15; padding: 20px; border-radius: 6px; border: 1px solid #272B22; margin-bottom: 24px;">
          <h4 style="margin: 0 0 10px 0; color: #9E9E94; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Project Brief & Scope</h4>
          <p style="margin: 0; color: #F5F3ED; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${description}</p>
        </div>

        <div style="font-size: 12px; color: #6E7169; border-top: 1px solid #272B22; padding-top: 16px;">
          Sent from VARENO web portal · Direct reply will email ${fullName} (${email}).
        </div>
      </div>
    `;

    const sendResendEmail = async (sender: string) => {
      return fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: sender,
          to: toEmail,
          reply_to: email,
          subject: emailSubject,
          html: emailHtml,
          text: `New VARENO Project Enquiry (${referenceId})\n\nName: ${fullName}\nEmail: ${email}\nCompany: ${companyName || 'N/A'}\nProject Type: ${projectType}\nBudget: ${budget}\nTimeline: ${timeline}\n\nBrief:\n${description}`,
        }),
      });
    };

    let resendResponse = await sendResendEmail(fromEmail);

    // If Resend rejected due to unverified custom domain, gracefully retry with Resend testing sender
    if (!resendResponse.ok && fromEmail !== 'VARENO Enquiries <onboarding@resend.dev>') {
      console.warn('[VARENO Server] Resend custom domain unverified, retrying with testing sender onboarding@resend.dev');
      resendResponse = await sendResendEmail('VARENO Enquiries <onboarding@resend.dev>');
    }

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('[VARENO Server] Resend API error response:', errorText);
      return {
        status: 502,
        body: {
          success: false,
          configured: true,
          message: 'The email delivery service encountered an issue. Please try again or reach out directly to varenowebdesignstudio@gmail.com.',
        },
      };
    }

    return {
      status: 200,
      body: {
        success: true,
        configured: true,
        enquiryReference: referenceId,
        submittedAt,
        message: 'Your project enquiry has been delivered directly to VARENO. We will review your requirements and respond within one business day.',
      },
    };
  } catch (error) {
    console.error('[VARENO Server] Failed to send enquiry email via Resend:', error);
    return {
      status: 500,
      body: {
        success: false,
        configured: true,
        message: 'A network error occurred while dispatching your enquiry. Please retry.',
      },
    };
  }
}
