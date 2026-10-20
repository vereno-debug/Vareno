import type { IncomingMessage, ServerResponse } from 'http';
import { processContactSubmission } from '../src/server/contactHandler.js';

export default async function handler(
  req: IncomingMessage & { body?: unknown; headers: Record<string, string | string[] | undefined>; query?: Record<string, string | string[]> },
  res: ServerResponse
) {
  // CORS Headers for preflight and standard responses
  res.setHeader?.('Access-Control-Allow-Origin', '*');
  res.setHeader?.('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader?.('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader?.('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: 'Method Not Allowed' }));
    return;
  }

  // Parse body across Vercel environments (pre-parsed object, stringified JSON, or raw stream)
  let body = req.body;
  if (!body) {
    try {
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const rawString = Buffer.concat(buffers).toString().trim();
      body = rawString ? JSON.parse(rawString) : {};
    } catch {
      res.statusCode = 400;
      res.setHeader?.('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, message: 'Malformed JSON payload' }));
      return;
    }
  } else if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      res.statusCode = 400;
      res.setHeader?.('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, message: 'Malformed JSON payload' }));
      return;
    }
  }

  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = typeof forwarded === 'string'
    ? forwarded.split(',')[0].trim()
    : Array.isArray(forwarded)
    ? forwarded[0]
    : req.socket?.remoteAddress || 'unknown';

  const { status, body: responseBody } = await processContactSubmission(body, clientIp);

  const resAny = res as any;
  if (typeof resAny.status === 'function') {
    const chained = resAny.status(status);
    if (chained && typeof chained.json === 'function') {
      chained.json(responseBody);
      return;
    }
  }

  res.statusCode = status;
  res.setHeader?.('Content-Type', 'application/json');
  res.end(JSON.stringify(responseBody));
}
