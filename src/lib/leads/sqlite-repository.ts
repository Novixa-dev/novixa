import { CreateLeadInput, LeadRecord, LeadRepository, LeadStatus } from './types';
import path from 'path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

let dbInstance: any = null;
let isInMemoryFallback = false;

function getDatabase() {
  if (dbInstance) return dbInstance;

  try {
    // Built-in Node 22 node:sqlite module
    const { DatabaseSync } = require('node:sqlite');
    const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'novixa_leads.sqlite');

    const initDb = (targetPath: string) => {
      const db = new DatabaseSync(targetPath);
      db.exec(`
        CREATE TABLE IF NOT EXISTS leads (
          id TEXT PRIMARY KEY,
          createdAt TEXT NOT NULL,
          updatedAt TEXT NOT NULL,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          company TEXT,
          projectType TEXT NOT NULL,
          industry TEXT NOT NULL,
          operationalProblem TEXT,
          currentSetup TEXT,
          budgetRange TEXT,
          timeline TEXT,
          message TEXT,
          language TEXT DEFAULT 'ar',
          source TEXT DEFAULT 'web_wizard',
          status TEXT DEFAULT 'NEW'
        );
      `);
      return db;
    };

    try {
      dbInstance = initDb(dbPath);
    } catch (fsErr) {
      console.warn('[Novixa SQLite] File DB init failed, fallback to fresh DB:', fsErr);
      try {
        const fs = require('node:fs');
        if (fs.existsSync(dbPath)) {
          fs.unlinkSync(dbPath);
        }
        dbInstance = initDb(dbPath);
      } catch (retryErr) {
        console.warn('[Novixa SQLite] Re-creation failed, using :memory:', retryErr);
        dbInstance = initDb(':memory:');
        isInMemoryFallback = true;
      }
    }

    return dbInstance;
  } catch (err) {
    console.warn('[Novixa SQLite] node:sqlite unavailable, using memory repository fallback:', err);
    dbInstance = null;
    return null;
  }
}

export class SQLiteLeadRepository implements LeadRepository {
  private memoryLeadsMap = new Map<string, LeadRecord>();

  async create(input: CreateLeadInput): Promise<LeadRecord> {
    const db = getDatabase();
    const now = new Date().toISOString();
    const id = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const record: LeadRecord = {
      id,
      createdAt: now,
      updatedAt: now,
      name: input.name.trim().slice(0, 100),
      email: input.email.trim().toLowerCase().slice(0, 100),
      phone: input.phone ? input.phone.trim().slice(0, 50) : undefined,
      company: input.company ? input.company.trim().slice(0, 100) : undefined,
      projectType: input.projectType.trim().slice(0, 100),
      industry: input.industry.trim().slice(0, 100),
      operationalProblem: input.operationalProblem ? input.operationalProblem.trim().slice(0, 1000) : undefined,
      currentSetup: input.currentSetup ? input.currentSetup.trim().slice(0, 200) : undefined,
      budgetRange: input.budgetRange ? input.budgetRange.trim().slice(0, 50) : '$10k - $25k',
      timeline: input.timeline ? input.timeline.trim().slice(0, 50) : 'Asap',
      message: input.message ? input.message.trim().slice(0, 1000) : undefined,
      language: input.language ? input.language.trim().slice(0, 10) : 'ar',
      source: input.source ? input.source.trim().slice(0, 50) : 'web_wizard',
      status: 'NEW',
    };

    if (db) {
      try {
        const stmt = db.prepare(`
          INSERT INTO leads (
            id, createdAt, updatedAt, name, email, phone, company,
            projectType, industry, operationalProblem, currentSetup,
            budgetRange, timeline, message, language, source, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        stmt.run(
          record.id,
          record.createdAt,
          record.updatedAt,
          record.name,
          record.email,
          record.phone || null,
          record.company || null,
          record.projectType,
          record.industry,
          record.operationalProblem || null,
          record.currentSetup || null,
          record.budgetRange || null,
          record.timeline || null,
          record.message || null,
          record.language || 'ar',
          record.source || 'web_wizard',
          record.status
        );
      } catch (dbErr) {
        console.error('[Novixa SQLite] Query Execution Error:', dbErr);
        this.memoryLeadsMap.set(record.id, record);
      }
    } else {
      this.memoryLeadsMap.set(record.id, record);
    }

    return record;
  }

  async findById(id: string): Promise<LeadRecord | null> {
    const db = getDatabase();
    if (db) {
      try {
        const stmt = db.prepare('SELECT * FROM leads WHERE id = ?');
        const row = stmt.get(id) as any;
        if (!row) return null;
        return this.mapRowToLead(row);
      } catch (err) {
        console.error('[Novixa SQLite] FindById Error:', err);
      }
    }
    return this.memoryLeadsMap.get(id) || null;
  }

  async list(): Promise<LeadRecord[]> {
    const db = getDatabase();
    if (db) {
      try {
        const stmt = db.prepare('SELECT * FROM leads ORDER BY createdAt DESC');
        const rows = stmt.all() as any[];
        return rows.map(r => this.mapRowToLead(r));
      } catch (err) {
        console.error('[Novixa SQLite] List Error:', err);
      }
    }
    return Array.from(this.memoryLeadsMap.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async updateStatus(id: string, status: LeadStatus): Promise<LeadRecord | null> {
    const db = getDatabase();
    const now = new Date().toISOString();

    if (db) {
      try {
        const stmt = db.prepare('UPDATE leads SET status = ?, updatedAt = ? WHERE id = ?');
        stmt.run(status, now, id);
        return this.findById(id);
      } catch (err) {
        console.error('[Novixa SQLite] UpdateStatus Error:', err);
      }
    }

    const memoryLead = this.memoryLeadsMap.get(id);
    if (memoryLead) {
      memoryLead.status = status;
      memoryLead.updatedAt = now;
      this.memoryLeadsMap.set(id, memoryLead);
      return memoryLead;
    }

    return null;
  }

  private mapRowToLead(row: any): LeadRecord {
    return {
      id: row.id,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      name: row.name,
      email: row.email,
      phone: row.phone || undefined,
      company: row.company || undefined,
      projectType: row.projectType,
      industry: row.industry,
      operationalProblem: row.operationalProblem || undefined,
      currentSetup: row.currentSetup || undefined,
      budgetRange: row.budgetRange || undefined,
      timeline: row.timeline || undefined,
      message: row.message || undefined,
      language: row.language || 'ar',
      source: row.source || 'web_wizard',
      status: row.status as LeadStatus,
    };
  }
}
