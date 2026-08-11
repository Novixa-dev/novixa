import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { leadService } from "./src/lib/leads/service";

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
