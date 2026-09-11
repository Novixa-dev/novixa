'use client';

import React, { useState } from 'react';
import { Terminal, Copy, Check, Shield } from 'lucide-react';

interface AdrSnippetCardProps {
  slug: string;
  isAr: boolean;
}

const ADR_BLUEPRINTS: Record<string, { code: string; titleAr: string; titleEn: string; status: string }> = {
  'custom-vs-ready': {
    titleAr: 'وثيقة القرار المعماري (ADR-001): استراتيجية بناء الأصل البرمجي المخصص',
    titleEn: 'Architecture Decision Record (ADR-001): Custom Engine Isolation',
    status: 'ACCEPTED / PRODUCTION READY',
    code: `architecture_decision_record:
  id: ADR-001
  status: Accepted
  pattern: Domain-Driven Modular Monolith -> Microservices
  boundaries:
    data_isolation: PostgreSQL Row-Level Security (RLS)
    cqrs: Decoupled Read Replicas for High Concurrency
    messaging: RabbitMQ / Redis Streams Event-Driven
  data_residency:
    primary: GCC Cloud (Riyadh me-central1)
    failover: UAE Cloud (Dubai me-central2)
  target_sla: 99.99% Availability`,
  },
  'multi-tenant-saas': {
    titleAr: 'وثيقة القرار المعماري (ADR-002): معمارية العزل التام لمنصات SaaS متعددة المشتركين',
    titleEn: 'Architecture Decision Record (ADR-002): Zero-Leakage Multi-Tenant Isolation',
    status: 'ACCEPTED / PRODUCTION READY',
    code: `architecture_decision_record:
  id: ADR-002
  status: Accepted
  tenant_context:
    resolution: AsyncLocalStorage Context Propagation
    header: x-novixa-tenant-uuid
  isolation_layers:
    db: Shared Multi-Tenant with Tenant-Partitioned Tables
    cache: Redis Namespaced Keys (tenant:{id}:cache)
    storage: S3/Cloud Storage Sub-Path Encrypted Keys
  scale_target:
    concurrency: 10,000+ RPS
    p99_latency: < 25ms`,
  },
  'practical-ai': {
    titleAr: 'وثيقة القرار المعماري (ADR-003): بنية استرجاع وتضمين المستندات (RAG) دون تسريب البيانات',
    titleEn: 'Architecture Decision Record (ADR-003): Privacy-Preserving Applied RAG Pipeline',
    status: 'ACCEPTED / PRODUCTION READY',
    code: `architecture_decision_record:
  id: ADR-003
  status: Accepted
  rag_pipeline:
    ingestion: Chunking with Recursive Character Split (500 tokens)
    embedding: text-embedding-3-small (Vector Dimension: 1536)
    vector_store: PostgreSQL with pgvector (HNSW Indexing)
  security_bounds:
    pii_redaction: Automated Pre-Inference Masking
    retention: Zero Cloud Model Training Agreement
    latency: Streaming Edge Response < 400ms`,
  },
};

export const AdrSnippetCard: React.FC<AdrSnippetCardProps> = ({ slug, isAr }) => {
  const [copied, setCopied] = useState(false);

  const adr = ADR_BLUEPRINTS[slug] || ADR_BLUEPRINTS['custom-vs-ready'];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(adr.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl text-right rtl:text-right ltr:text-left my-6">
      {/* Header bar */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <Terminal className="w-4 h-4 text-teal-400" />
          <span className="font-semibold">{isAr ? adr.titleAr : adr.titleEn}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 text-[10px] font-mono">
            {adr.status}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Copy Blueprint"
            aria-label={copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ المخطط' : 'Copy Blueprint')}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">{isAr ? 'تم النسخ!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{isAr ? 'نسخ المخطط' : 'Copy YAML'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div className="p-4 overflow-x-auto text-xs font-mono text-slate-200 bg-slate-950/90 leading-relaxed text-left" dir="ltr">
        <pre>
          <code>{adr.code}</code>
        </pre>
      </div>

      {/* Footer reassurance */}
      <div className="px-4 py-2 bg-slate-900/40 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-blue-400" />
          <span>{isAr ? 'معمارية معتمدة ومتوافقة مع الحوكمة السحابية الخليجية' : 'Verified GCC Sovereign Architecture Pattern'}</span>
        </span>
        <span className="hidden sm:inline text-slate-500">YAML · RFC-Compliance</span>
      </div>
    </div>
  );
};
export default AdrSnippetCard;
