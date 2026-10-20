import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { processContactSubmission } from './src/server/contactHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // API Health & status check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'operational',
      brand: 'VARENO',
      timestamp: new Date().toISOString(),
      emailConfigured: Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL),
    });
  });

  // Project enquiry endpoint
  app.post('/api/contact', async (req, res) => {
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || 'unknown';
    const { status, body } = await processContactSubmission(req.body, clientIp);
    res.status(status).json(body);
  });

  if (!isProduction) {
    // Mount Vite dev server in middleware mode
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static build
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[VARENO Server] Listening on http://0.0.0.0:${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('[VARENO Server] Failed to start server:', err);
  process.exit(1);
});
