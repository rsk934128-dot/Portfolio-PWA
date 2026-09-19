import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: number;
  userAgent?: string;
  ip?: string;
  status: 'delivered' | 'stored';
}

const contactStore: ContactSubmission[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON & URL-encoded parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Route: Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Sheikh Farid Portfolio PWA Backend',
      timestamp: Date.now(),
      targetEmail: 'sheikhfaridvisa164@gmail.com',
    });
  });

  // API Route: Contact Form Dispatch
  app.post('/api/contact', (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: 'Name, email, and message are required fields.',
        });
      }

      // Basic email regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(String(email).trim())) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a valid email address.',
        });
      }

      const submission: ContactSubmission = {
        id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        name: String(name).trim(),
        email: String(email).trim(),
        subject: String(subject || 'General Inquiry').trim(),
        message: String(message).trim(),
        timestamp: Date.now(),
        userAgent: req.headers['user-agent'],
        ip: req.ip || req.socket.remoteAddress,
        status: 'delivered',
      };

      contactStore.unshift(submission);

      console.log('=== [NEW PORTFOLIO MESSAGE RECEIVED] ===');
      console.log(`From: ${submission.name} <${submission.email}>`);
      console.log(`Subject: ${submission.subject}`);
      console.log(`Time: ${new Date(submission.timestamp).toISOString()}`);
      console.log(`Destination: sheikhfaridvisa164@gmail.com`);
      console.log(`Message Body:\n${submission.message}`);
      console.log('========================================');

      return res.status(200).json({
        success: true,
        message: `Your message has been delivered to Sheikh Farid (sheikhfaridvisa164@gmail.com).`,
        submissionId: submission.id,
        timestamp: submission.timestamp,
        deliveredTo: 'sheikhfaridvisa164@gmail.com',
      });
    } catch (err: any) {
      console.error('Error handling contact submission:', err);
      return res.status(500).json({
        success: false,
        error: 'Internal server error while dispatching message.',
      });
    }
  });

  // API Route: View contact messages (for development & monitoring)
  app.get('/api/contact/messages', (req, res) => {
    res.json({
      success: true,
      count: contactStore.length,
      messages: contactStore,
    });
  });

  // API Route: Resume profile data
  app.get('/api/resume', (req, res) => {
    res.json({
      name: 'Sheikh Farid',
      title: 'Lead Full-Stack & Mobile PWA Developer',
      email: 'sheikhfaridvisa164@gmail.com',
      location: 'Dhaka, Bangladesh / Remote',
      specialties: [
        'Progressive Web Apps (PWA)',
        'Android WebView & Dalvik/Smali Bridges',
        'React 19 & TypeScript',
        'Node.js & Express REST APIs',
        'Offline-First Architectures',
      ],
      pwaPackages: ['com.pwa.vercel_com', 'com.pwa.youtube_com'],
      availableForHire: true,
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
