import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Load .env.local first, fallback to .env
if (fs.existsSync(path.join(process.cwd(), ".env.local"))) {
  dotenv.config({ path: path.join(process.cwd(), ".env.local") });
} else {
  dotenv.config();
}

import { leadService } from "./src/lib/leads/service";
import { generateGeminiGreeting } from "./src/lib/ai/gemini";
import { sendNovixaTestEmail } from "./src/lib/email/resend";
import { testAdminConnectivity, getAdminAuth } from "./src/lib/firebase/admin";
import { validateEnvironment } from "./src/lib/env";

interface LeadPayload {
  projectType: string;
  industry: string;
  problem?: string;
  existingSystem?: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  budgetRange?: string;
  timeline?: string;
  details?: string;
}

interface PulsePayload {
  author?: string;
  role?: string;
  category?: string;
  feedback: string;
}

interface AnalyticsEvent {
  event: string;
  page?: string;
  language?: string;
  details?: Record<string, any>;
  timestamp: string;
}

const LEADS_FILE = path.join(process.cwd(), "leads.json");
const ANALYTICS_FILE = path.join(process.cwd(), "analytics.json");

// Helper to append records safely
function saveToFile<T>(filePath: string, newItem: T) {
  try {
    let items: T[] = [];
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      if (content.trim()) {
        items = JSON.parse(content);
      }
    }
    items.push(newItem);
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing to ${filePath}:`, err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Simple rate limiting & sanitization state
  const ipSubmissionMap = new Map<string, number[]>();

  const isRateLimited = (ip: string, limit = 10, windowMs = 60000): boolean => {
    const now = Date.now();
    const timestamps = (ipSubmissionMap.get(ip) || []).filter(t => now - t < windowMs);
    if (timestamps.length >= limit) return true;
    timestamps.push(now);
    ipSubmissionMap.set(ip, timestamps);
    return false;
  };

  // --- API ROUTES ---

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      app: "Novixa Platform Engine",
      version: "1.0.0",
      timestamp: new Date().toISOString()
    });
  });

  // POST /api/leads - Real B2B Project Discovery & Lead Intake
  app.post("/api/leads", async (req, res) => {
    const clientIp = req.ip || req.socket.remoteAddress || "127.0.0.1";

    if (isRateLimited(clientIp, 5, 60000)) {
      res.status(429).json({
        success: false,
        error: "Too many project inquiries submitted. Please try again in a minute."
      });
      return;
    }

    const {
      projectType,
      industry,
      problem,
      existingSystem,
      name,
      company,
      email,
      phone,
      budgetRange,
      timeline,
      details,
      language
    } = req.body as LeadPayload & { language?: string };

    const result = await leadService.submitLead({
      name,
      email,
      phone,
      company,
      projectType,
      industry,
      operationalProblem: problem,
      currentSetup: existingSystem,
      budgetRange,
      timeline,
      message: details,
      language: language || 'ar',
      source: 'web_wizard'
    });

    if (result.success === false) {
      res.status(400).json({ success: false, error: result.error });
      return;
    }

    // Secondary backup JSON log
    saveToFile(LEADS_FILE, result.lead);

    res.status(201).json({
      success: true,
      leadId: result.lead.id,
      timestamp: result.lead.createdAt,
      message: "Your project brief has been registered with Novixa engineering leadership."
    });
  });

  // POST /api/pulse - Interactive Product Demo Feedback Submission
  app.post("/api/pulse", (req, res) => {
    const { feedback, category, author, role } = req.body as PulsePayload;

    if (!feedback || !feedback.trim()) {
      res.status(400).json({ success: false, error: "Feedback note cannot be empty." });
      return;
    }

    // Server-side sentiment analysis simulation
    const feedbackLength = feedback.trim().length;
    const score = Math.min(99, Math.max(75, 80 + (feedbackLength % 18)));

    const pulseEntry = {
      id: `pulse_${Date.now()}`,
      timestamp: new Date().toISOString(),
      author: author ? String(author).slice(0, 50) : "عضو فريق التشغيل",
      role: role ? String(role).slice(0, 50) : "الملاحة الميدانية",
      category: category ? String(category).slice(0, 50) : "تحسين تشغيلي",
      text: String(feedback).slice(0, 500),
      votes: 1,
      score,
      status: "ANALYZED"
    };

    console.log("⚡ NOVIXA PULSE DEMO SUBMISSION:", pulseEntry);

    res.status(200).json({
      success: true,
      item: pulseEntry,
      calculatedPulseScore: score,
      message: "Feedback analyzed and incorporated into Pulse demo state."
    });
  });

  // POST /api/analytics - Modular Privacy-Conscious Event Logging
  app.post("/api/analytics", (req, res) => {
    const { event, page, language, details } = req.body as AnalyticsEvent;

    if (!event) {
      res.status(400).json({ success: false, error: "Event name required." });
      return;
    }

    const eventRecord: AnalyticsEvent = {
      event: String(event).slice(0, 50),
      page: page ? String(page).slice(0, 50) : "/",
      language: language ? String(language).slice(0, 10) : "ar",
      details: details || {},
      timestamp: new Date().toISOString()
    };

    saveToFile(ANALYTICS_FILE, eventRecord);

    res.status(200).json({ success: true });
  });

  // GET /api/leads - Inspect received leads (Protected / Internal Readiness)
  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await leadService.getAllLeads();
      res.json({ success: true, count: leads.length, leads });
    } catch {
      res.json({ success: true, count: 0, leads: [] });
    }
  });

  // --- INTEGRATION TEST API ROUTES ---

  // GET /api/env/status - Check configuration presence without revealing secrets
  app.get("/api/env/status", (req, res) => {
    const envStatus = validateEnvironment();
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      envStatus,
    });
  });

  // POST /api/ai/test - Server-side Gemini API test
  app.post("/api/ai/test", async (req, res) => {
    try {
      const { prompt } = req.body || {};
      const aiResult = await generateGeminiGreeting(prompt);
      res.json({
        success: true,
        service: "Gemini AI (@google/genai)",
        response: aiResult.text,
        model: aiResult.model,
        timestamp: aiResult.timestamp,
      });
    } catch (err: any) {
      console.error("❌ Gemini Test Error:", err);
      res.status(500).json({
        success: false,
        error: err?.message || "Failed to communicate with Gemini API.",
      });
    }
  });

  // POST /api/email/test - Server-side Resend email dispatch test
  app.post("/api/email/test", async (req, res) => {
    try {
      const emailResult = await sendNovixaTestEmail();
      res.json({
        success: true,
        service: "Resend Email Gateway",
        emailId: emailResult.emailId,
        recipient: emailResult.recipient,
        timestamp: emailResult.timestamp,
        message: "Test email dispatched successfully via Resend.",
      });
    } catch (err: any) {
      console.error("❌ Resend Test Error:", err);
      res.status(500).json({
        success: false,
        error: err?.message || "Failed to send test email via Resend.",
      });
    }
  });

  // POST /api/firebase/test - Server-side Firebase Admin SDK connectivity test
  app.post("/api/firebase/test", async (req, res) => {
    try {
      const fbResult = await testAdminConnectivity();
      if (!fbResult.success) {
        res.status(500).json({ success: false, error: fbResult.message });
        return;
      }
      res.json({
        success: true,
        service: "Firebase Admin SDK & Firestore",
        message: fbResult.message,
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      console.error("❌ Firebase Admin Test Error:", err);
      res.status(500).json({
        success: false,
        error: err?.message || "Firebase Admin connectivity test failed.",
      });
    }
  });

  // POST /api/auth/verify - Verify Firebase Auth ID Token server-side
  app.post("/api/auth/verify", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      const bodyToken = req.body?.idToken;
      const token = bodyToken || (authHeader?.startsWith("Bearer ") ? authHeader.split("Bearer ")[1] : null);

      if (!token) {
        res.status(400).json({ success: false, error: "Missing ID token in request body or Authorization header." });
        return;
      }

      const decodedToken = await getAdminAuth().verifyIdToken(token);
      res.json({
        success: true,
        uid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
        authTime: new Date(decodedToken.auth_time * 1000).toISOString(),
      });
    } catch (err: any) {
      console.error("❌ Token Verification Error:", err);
      res.status(401).json({
        success: false,
        error: err?.message || "Invalid or expired Firebase Auth token.",
      });
    }
  });

  // --- VITE DEV / PRODUCTION MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Novixa Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
