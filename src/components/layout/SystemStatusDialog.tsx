'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Activity, AlertTriangle, CheckCircle2, Loader2, X, XCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { interpretHealth, type StatusView } from '@/lib/system-status';

interface SystemStatusDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Public status of this website, measured by the visitor's own browser.
 *
 * Replaces an "edge telemetry" panel that listed datacentres in Riyadh, Dubai
 * and Jeddah with latencies, a 90-day uptime figure and an incident count.
 * Those were invented — the site runs on a single VPS — and `AI_WORKING_RULES`
 * forbids inventing SLAs. Everything here comes from `/api/health` or from the
 * time the request took, and the dialog says so.
 */
export const SystemStatusDialog: React.FC<SystemStatusDialogProps> = ({ open, onClose }) => {
  const { t } = useLanguage();
  const [view, setView] = useState<StatusView>({ state: 'checking' });
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const controller = new AbortController();
    const started = performance.now();
    setView({ state: 'checking' });
    closeRef.current?.focus();

    fetch('/api/health', { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        const body: unknown = await response.json().catch(() => null);
        setView(interpretHealth(response.status, body, performance.now() - started));
      })
      .catch((error: unknown) => {
        if ((error as { name?: string } | null)?.name !== 'AbortError') setView({ state: 'unreachable' });
      });

    return () => controller.abort();
  }, [open]);

  if (!open) return null;

  const headline = (() => {
    switch (view.state) {
      case 'operational':
        return { Icon: CheckCircle2, tone: 'text-emerald-400', text: t('يعمل بشكل طبيعي', 'Operational') };
      case 'degraded':
        return { Icon: AlertTriangle, tone: 'text-amber-400', text: t('الأداء متدهور', 'Degraded') };
      case 'unreachable':
        return { Icon: XCircle, tone: 'text-rose-400', text: t('تعذّر الوصول إلى فحص الحالة', 'Could not reach the status check') };
      default:
        return { Icon: Loader2, tone: 'text-slate-300', text: t('جارٍ الفحص…', 'Checking…') };
    }
  })();

  const rows: Array<{ label: string; value: string; mono?: boolean }> = [];
  if (view.state === 'operational' || view.state === 'degraded') {
    if (view.database === 'connected') rows.push({ label: t('قاعدة البيانات', 'Database'), value: t('متصلة', 'Connected') });
    if (view.database === 'unavailable') rows.push({ label: t('قاعدة البيانات', 'Database'), value: t('غير متاحة', 'Unavailable') });
    rows.push({ label: t('زمن الاستجابة من متصفحك', 'Response time from your browser'), value: `${view.ms} ms`, mono: true });
    if (view.version) rows.push({ label: t('الإصدار المنشور', 'Deployed release'), value: view.version, mono: true });
  }
  rows.push({ label: t('الاتصال', 'Connection'), value: t('HTTPS فقط (HSTS)', 'HTTPS only (HSTS)') });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="system-status-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="glass-overlay border border-white/[0.12] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 text-right rtl:text-right ltr:text-left"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-950/80 border border-slate-700/60 flex items-center justify-center text-blue-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 id="system-status-title" className="text-sm font-bold text-white font-display leading-snug">
                {t('حالة النظام', 'System status')}
              </h2>
              <span className="text-[11px] text-slate-400">
                {t('فحص مباشر يجري الآن من متصفحك', 'A live check running from your browser')}
              </span>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label={t('إغلاق', 'Close')}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2.5" role="status" aria-live="polite">
          <headline.Icon className={`w-5 h-5 shrink-0 ${headline.tone} ${view.state === 'checking' ? 'animate-spin' : ''}`} aria-hidden="true" />
          <span className={`text-sm font-bold ${headline.tone}`}>{headline.text}</span>
        </div>

        <dl className="rounded-xl bg-slate-950/60 border border-slate-800/80 divide-y divide-slate-800/80 text-xs">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 px-3 py-2.5">
              <dt className="text-slate-400">{row.label}</dt>
              <dd className={`text-slate-100 font-semibold ${row.mono ? 'font-mono' : ''}`} dir={row.mono ? 'ltr' : undefined}>
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="text-[11px] text-slate-400 leading-relaxed">
          {t(
            'هذه نتيجة فحص لحظي لنقطة /api/health. لا نعرض نسبة توافر تاريخية لأننا لا نسجّلها بعد.',
            'This is a point-in-time check of /api/health. We do not show an uptime percentage because we are not recording one yet.'
          )}
        </p>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            {t('إغلاق', 'Close')}
          </button>
        </div>
      </div>
    </div>
  );
};
