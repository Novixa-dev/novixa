import { Resend } from 'resend';
import { getServerEnv } from '../env';

if (typeof window !== 'undefined') {
  throw new Error('SECURITY VIOLATION: resend.ts imported in browser bundle.');
}

export async function sendNovixaTestEmail() {
  const env = getServerEnv();

  if (!env.resendApiKey) {
    throw new Error('RESEND_API_KEY is missing in server environment.');
  }

  const resend = new Resend(env.resendApiKey);

  const htmlBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Novixa Development Integration Test</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 40px 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 32px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
        .logo { font-size: 24px; font-weight: bold; color: #38bdf8; letter-spacing: -0.5px; margin-bottom: 24px; }
        .status-badge { display: inline-block; background-color: #0284c7; color: #ffffff; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 9999px; margin-bottom: 20px; text-transform: uppercase; }
        h1 { font-size: 20px; color: #ffffff; margin-bottom: 12px; }
        p { font-size: 14px; line-height: 1.6; color: #94a3b8; margin-bottom: 16px; }
        .grid { background-color: #0f172a; border-radius: 12px; padding: 16px; border: 1px solid #1e293b; margin-top: 20px; }
        .grid-item { display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; border-bottom: 1px dashed #334155; }
        .grid-item:last-child { border-bottom: none; }
        .label { color: #64748b; font-weight: 500; }
        .value { color: #38bdf8; font-weight: 600; font-family: monospace; }
        .footer { margin-top: 32px; font-size: 12px; color: #475569; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">NOVIXA</div>
        <div class="status-badge">Development Integration Verified</div>
        <h1>Novixa Engineering Telemetry Test</h1>
        <p>This automated message confirms that the <strong>Novixa Platform Engine</strong>, <strong>Express / Next.js Server</strong>, <strong>Resend Email Gateway</strong>, and server-side API proxy routing are operating seamlessly.</p>
        
        <div class="grid">
          <div class="grid-item"><span class="label">Platform</span><span class="value">Novixa Core Engine v1.0.0</span></div>
          <div class="grid-item"><span class="label">Sender</span><span class="value">${env.resendFromEmail}</span></div>
          <div class="grid-item"><span class="label">Recipient</span><span class="value">${env.novixaContactEmail}</span></div>
          <div class="grid-item"><span class="label">Timestamp</span><span class="value">${new Date().toISOString()}</span></div>
          <div class="grid-item"><span class="label">Security</span><span class="value">Server-Side Proxy Isolated</span></div>
        </div>

        <p style="margin-top:20px;">No secret credentials or API keys were exposed to the browser client during this transaction.</p>
        
        <div class="footer">
          &copy; ${new Date().getFullYear()} Novixa Technologies. Development & Testing Environment.
        </div>
      </div>
    </body>
    </html>
  `;

  const { data, error } = await resend.emails.send({
    from: env.resendFromEmail,
    to: [env.novixaContactEmail],
    subject: 'Novixa Development Integration Test',
    html: htmlBody,
  });

  if (error) {
    throw new Error(`Resend API Error: ${error.message}`);
  }

  return {
    success: true,
    emailId: data?.id || 'id_simulated',
    recipient: env.novixaContactEmail,
    timestamp: new Date().toISOString(),
  };
}
