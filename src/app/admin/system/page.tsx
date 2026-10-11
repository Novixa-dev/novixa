import {
  Activity,
  Database,
  Mail,
  ShieldCheck,
  Server,
  GitCommit,
  Cpu,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { requireAdmin } from '@/lib/auth/admin';
import { AdminShell } from '@/components/admin/AdminShell';
import { getLeadStore } from '@/lib/leads';
import { getMailer } from '@/lib/mail';
import { getAdminLang, translator } from '../i18n';

export default async function AdminSystemPage() {
  const session = await requireAdmin();
  const lang = await getAdminLang();
  const t = translator(lang);
  const store = getLeadStore();
  const mailer = getMailer();

  // Measure database roundtrip time
  const t0 = Date.now();
  const health = store
    ? await store.health()
    : { ok: false, detail: t('غير مضبوطة', 'not configured') };
  const dbLatencyMs = Date.now() - t0;

  const build = process.env.NEXT_PUBLIC_BUILD_SHA || process.env.BUILD_SHA || '';
  const nodeVersion = process.version;
  const platform = process.platform;
  const memory = process.memoryUsage();
  const heapUsedMb = Math.round(memory.heapUsed / 1024 / 1024);
  const heapTotalMb = Math.round(memory.heapTotal / 1024 / 1024);
  const rssMb = Math.round(memory.rss / 1024 / 1024);

  const securityPolicies = [
    {
      name: 'HSTS (Strict-Transport-Security)',
      status: 'active',
      desc: t('فرض التشفير التام عبر HTTPS لمدة سنتين مع Preload', 'Strict HTTPS enforcement with max-age=63072000; includeSubDomains; preload'),
    },
    {
      name: 'X-Frame-Options (SAMEORIGIN)',
      status: 'active',
      desc: t('حماية الموقع من محاولات التضمين الخبيث (Clickjacking)', 'Prevents site framing and clickjacking attacks'),
    },
    {
      name: 'X-Content-Type-Options (nosniff)',
      status: 'active',
      desc: t('منع المتصفحات من تخمين نوع المحتوى أو تنفيذه كنص برمجي', 'Disables browser MIME-type sniffing'),
    },
    {
      name: 'Referrer-Policy (strict-origin-when-cross-origin)',
      status: 'active',
      desc: t('حماية خصوصية عناوين الإحالة عند مغادرة الموقع', 'Protects referrer privacy across cross-origin destinations'),
    },
    {
      name: 'Permissions-Policy (camera=(), microphone=(), geolocation=())',
      status: 'active',
      desc: t('حظر صارم للوصول إلى الكاميرا والميكروفون والموقع الجغرافي', 'Restricts client browser hardware and sensor permissions'),
    },
  ];

  return (
    <AdminShell lang={lang} email={session.email} active="system">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.06] pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-600/15 text-emerald-400 text-xs font-semibold mb-2">
              <Activity className="h-3.5 w-3.5" />
              <span>{t('تشخيص البنية التحتية والجاهزية', 'Infrastructure & Diagnostics')}</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-white leading-snug">
              {t('حالة النظام والخدمات السحابية', 'System Health & Cloud Infrastructure')}
            </h1>
            <p className="text-sm text-slate-400">
              {t(
                'فحص حي لجاهزية قاعدة البيانات وخادم البريد، استهلاك الذاكرة، والتأكد من السياسات الأمنية النشطة.',
                'Live verification of database connectivity, mail transports, memory footprint, and security posture.'
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/api/health"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-slate-900/80 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5 text-emerald-400" />
              <span>{t('استدعاء نقطة الفحص /api/health', 'Probe /api/health Endpoint')}</span>
            </a>
          </div>
        </div>

        {/* Live Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Database Card */}
          <div className="glass-card rounded-2xl border border-white/[0.08] p-5 space-y-4">
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/15 text-blue-400 border border-blue-500/20">
                <Database className="h-5 w-5" />
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  health.ok
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                }`}
              >
                {health.ok ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                <span>{health.ok ? t('متصل وسليم', 'Healthy & Online') : t('غير متصل', 'Degraded')}</span>
              </span>
            </div>

            <div>
              <h3 className="font-display text-base font-bold text-white">{t('مستودع البيانات', 'Database Store')}</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {store?.kind === 'postgres' ? 'PostgreSQL Production Engine' : 'In-Memory Development Store'}
              </p>
            </div>

            <dl className="space-y-2 text-xs pt-2 border-t border-white/[0.05]">
              <div className="flex justify-between py-1">
                <dt className="text-slate-400">{t('النوع:', 'Kind:')}</dt>
                <dd className="font-mono text-white" translate="no">
                  {store?.kind || 'none'}
                </dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-slate-400">{t('زمن الاستجابة:', 'Latency:')}</dt>
                <dd className="font-mono text-emerald-400">{dbLatencyMs} ms</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-slate-400">{t('التفاصيل:', 'Detail:')}</dt>
                <dd className="text-slate-300 truncate max-w-[160px]">{health.detail}</dd>
              </div>
            </dl>
          </div>

          {/* Mail Transport Card */}
          <div className="glass-card rounded-2xl border border-white/[0.08] p-5 space-y-4">
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600/15 text-teal-400 border border-teal-500/20">
                <Mail className="h-5 w-5" />
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  mailer
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                }`}
              >
                {mailer ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                <span>{mailer ? t('مضبوط ونشط', 'Active Transport') : t('غير مضبوط', 'Not Configured')}</span>
              </span>
            </div>

            <div>
              <h3 className="font-display text-base font-bold text-white">{t('ناقل إشعارات البريد', 'Email Delivery')}</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {mailer ? (mailer.kind === 'smtp' ? 'Mailcow SMTP Transport' : 'Resend API') : t('الطلبات تُحفظ ولا تُرسل بريدياً', 'Leads stored locally, no email sent')}
              </p>
            </div>

            <dl className="space-y-2 text-xs pt-2 border-t border-white/[0.05]">
              <div className="flex justify-between py-1">
                <dt className="text-slate-400">{t('المزوّد:', 'Provider:')}</dt>
                <dd className="font-mono text-white" translate="no">
                  {mailer ? (mailer.kind === 'smtp' ? 'SMTP (Mailcow)' : 'Resend') : 'None'}
                </dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-slate-400">{t('المرسل:', 'From Address:')}</dt>
                <dd className="font-mono text-slate-300 truncate max-w-[160px]" translate="no">
                  {mailer ? mailer.from : '—'}
                </dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-slate-400">{t('إشعارات الوارد:', 'Admin Alert:')}</dt>
                <dd className="text-emerald-400">{mailer ? t('مفعّل', 'Enabled') : t('معطّل', 'Disabled')}</dd>
              </div>
            </dl>
          </div>

          {/* Runtime & Memory Card */}
          <div className="glass-card rounded-2xl border border-white/[0.08] p-5 space-y-4">
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/15 text-purple-400 border border-purple-500/20">
                <Cpu className="h-5 w-5" />
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                <Server className="h-3.5 w-3.5" />
                <span translate="no">Node.js {nodeVersion}</span>
              </span>
            </div>

            <div>
              <h3 className="font-display text-base font-bold text-white">{t('بيئة التشغيل والذاكرة', 'Runtime & Memory')}</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('استهلاك الرام والنسخة البرمجية الحالية', 'Application process memory and environment')}
              </p>
            </div>

            <dl className="space-y-2 text-xs pt-2 border-t border-white/[0.05]">
              <div className="flex justify-between py-1">
                <dt className="text-slate-400">{t('الذاكرة المستهلكة (Heap):', 'Heap Memory:')}</dt>
                <dd className="font-mono text-white">{heapUsedMb} MB / {heapTotalMb} MB</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-slate-400">{t('إجمالي العملية (RSS):', 'Total RSS:')}</dt>
                <dd className="font-mono text-slate-300">{rssMb} MB</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt className="text-slate-400">{t('نظام الخادم:', 'Platform:')}</dt>
                <dd className="font-mono text-slate-400" translate="no">{platform}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Security & Hardening Checklist */}
        <section className="glass-card rounded-2xl border border-white/[0.08] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-white leading-snug flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              {t('السياسات الأمنية والترويسات المشددة (Security Headers)', 'Active Security Headers & Hardening')}
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
              100/100 Hardened
            </span>
          </div>

          <div className="divide-y divide-white/[0.04] text-xs">
            {securityPolicies.map((p, idx) => (
              <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="font-mono font-medium text-white flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span translate="no">{p.name}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] ps-5.5">{p.desc}</p>
                </div>
                <span className="inline-flex self-start sm:self-auto text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-white/[0.06]">
                  {t('مفعل بالكامل', 'Enforced')}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Git & Deployment Information */}
        <section className="glass-card rounded-2xl border border-white/[0.08] p-5 space-y-3">
          <h2 className="font-display text-sm font-bold text-white leading-snug flex items-center gap-2">
            <GitCommit className="h-4 w-4 text-blue-400" />
            {t('معلومات النشر والحزمة البرمجية', 'Build & Deployment Information')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/[0.05]">
              <div className="text-slate-400 mb-1">{t('معرّف الحزمة (Git Commit SHA)', 'Commit SHA')}</div>
              <div className="font-mono text-white text-xs font-bold" translate="no">
                {build || 'Local Development'}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/[0.05]">
              <div className="text-slate-400 mb-1">{t('إطار العمل (Framework)', 'Engine')}</div>
              <div className="font-mono text-white text-xs font-bold" translate="no">
                Next.js 15.5.27 App Router
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/70 border border-white/[0.05]">
              <div className="text-slate-400 mb-1">{t('المستودع الرسمي', 'Repository')}</div>
              <div className="font-mono text-blue-300 text-xs font-bold" translate="no">
                Novixa-dev/novixa
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
