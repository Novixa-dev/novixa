import { CreateLeadInput, LeadRecord, LeadRepository, LeadStatus } from './types';
import { getAdminDb } from '../firebase/admin';

export class FirestoreLeadRepository implements LeadRepository {
  private collectionName = 'leads';
  private memoryLeadsMap = new Map<string, LeadRecord>();

  async create(input: CreateLeadInput): Promise<LeadRecord> {
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

    try {
      const db = getAdminDb();
      // Sanitize undefined fields for Firestore payload
      const firestoreData = JSON.parse(JSON.stringify(record));
      await db.collection(this.collectionName).doc(id).set(firestoreData);
    } catch (err) {
      console.warn('[Novixa FirestoreLeadRepository] Firestore write error, using memory fallback:', err);
      this.memoryLeadsMap.set(id, record);
    }

    return record;
  }

  async findById(id: string): Promise<LeadRecord | null> {
    try {
      const db = getAdminDb();
      const docRef = await db.collection(this.collectionName).doc(id).get();
      if (docRef.exists) {
        return docRef.data() as LeadRecord;
      }
    } catch (err) {
      console.warn('[Novixa FirestoreLeadRepository] Firestore findById error:', err);
    }
    return this.memoryLeadsMap.get(id) || null;
  }

  async list(): Promise<LeadRecord[]> {
    try {
      const db = getAdminDb();
      const snapshot = await db.collection(this.collectionName).orderBy('createdAt', 'desc').get();
      const leads: LeadRecord[] = [];
      snapshot.forEach(doc => {
        leads.push(doc.data() as LeadRecord);
      });
      if (leads.length > 0) return leads;
    } catch (err) {
      console.warn('[Novixa FirestoreLeadRepository] Firestore list error:', err);
    }
    return Array.from(this.memoryLeadsMap.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  async updateStatus(id: string, status: LeadStatus): Promise<LeadRecord | null> {
    const now = new Date().toISOString();
    try {
      const db = getAdminDb();
      const docRef = db.collection(this.collectionName).doc(id);
      await docRef.update({
        status,
        updatedAt: now,
      });
      return this.findById(id);
    } catch (err) {
      console.warn('[Novixa FirestoreLeadRepository] Firestore updateStatus error:', err);
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
}
