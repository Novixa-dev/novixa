'use client';

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Clock,
  ShieldCheck,
  Sparkles,
  Server,
  Building,
  RotateCcw,
  Check,
} from 'lucide-react';

interface ScopeOption {
  id: string;
  name: { ar: string; en: string };
  desc: { ar: string; en: string };
  baseWeeks: number;
  icon: React.ComponentType<{ className?: string }>;
}

const SYSTEM_CATEGORIES: ScopeOption[] = [
  {
    id: 'turnkey',
    name: { ar: 'حل برمجي تشغيلي جاهز', en: 'Turnkey Business Solution' },
    desc: {
      ar: 'أنظمة مجربة للمطاعم، الحجوزات، العقارات، أو نقاط البيع تنطلق في أيام.',
      en: 'Field-tested foundations for hospitality, bookings, or real estate live in days.',
    },
    baseWeeks: 1.5,
    icon: Layers,
  },
  {
    id: 'custom-platform',
    name: { ar: 'منصة أعمال مخصصة بالكامل', en: 'Bespoke Business Platform' },
    desc: {
      ar: 'هندسة معمارية مصممة خصيصاً لسير عملياتك ومفصلة على متطلبات شركتك.',
      en: 'Custom-engineered architecture modeled around your unique operational workflows.',
    },
    baseWeeks: 6,
    icon: Cpu,
  },
  {
    id: 'saas-product',
    name: { ar: 'منتج سحابي متعدد المستأجرين (SaaS)', en: 'Multi-Tenant SaaS Product' },
    desc: {
      ar: 'منصة سحابية متكاملة تخدم مئات الشركات مع عزل البيانات والاشتراكات.',
      en: 'Cloud platform serving multi-tenant businesses with strict data isolation.',
    },
    baseWeeks: 10,
    icon: Building,
  },
  {
    id: 'modernization',
    name: { ar: 'تحديث معمارية واستضافة سحابية', en: 'Cloud & Modernization' },
    desc: {
      ar: 'إعادة بناء الأنظمة القديمة ونقلها لحاويات Docker وسحابة ذات موثوقية عالية.',
      en: 'Modernize legacy codebases into containerized micro-services with zero data loss.',
    },
    baseWeeks: 4,
    icon: Server,
  },
];

interface ModuleChoice {
  id: string;
  label: { ar: string; en: string };
  hint: { ar: string; en: string };
  daysImpact: number;
}

const AVAILABLE_MODULES: ModuleChoice[] = [
  {
    id: 'kpi-dash',
    label: { ar: 'لوحة مؤشرات تنفيذية ورسوم بيانية', en: 'Executive KPI Dashboard & Analytics' },
    hint: { ar: 'متابعة العمليات والأداء في الوقت الفعلي', en: 'Real-time telemetry and operation charts' },
    daysImpact: 3,
  },
  {
    id: 'payments',
    label: { ar: 'بوابة دفع وفواتير إلكترونية', en: 'Payment Gateway & Invoicing' },
    hint: { ar: 'تكامل آمن مع بوابات الدفع المحلية والإقليمية', en: 'Secure regional & international checkout' },
    daysImpact: 4,
  },
  {
    id: 'rbac',
    label: { ar: 'صلاحيات متعددة وسجل تدقيق شامل', en: 'Role-Based Access & Audit Logs' },
    hint: { ar: 'عزل الأدوار وحماية البيانات المؤسسية', en: 'Granular permissions and audit history' },
    daysImpact: 3,
  },
  {
    id: 'notifications',
    label: { ar: 'إشعارات فورية وربط واتساب API', en: 'Real-time Webhook & WhatsApp Alerts' },
    hint: { ar: 'تنبيهات فورية للمدراء والعملاء في كل حدث', en: 'Automated event triggers and messaging' },
    daysImpact: 2,
  },
  {
    id: 'bilingual',
    label: { ar: 'دعم كامل ومتقن للغتين (عربي/إنجليزي)', en: 'Native Bilingual Architecture (AR/EN)' },
    hint: { ar: 'توجيه محلي وتصميم مستقل لكل لغة', en: 'Locale routing with balanced RTL/LTR' },
    daysImpact: 2,
  },
  {
    id: 'cloud-hosting',
    label: { ar: 'استضافة سحابية مدارة ونسخ احتياطي آلي', en: 'Managed Cloud & Automated Backups' },
    hint: { ar: 'نشر بدون توقف، مراقبة أداء وتأمين مستمر', en: 'Zero-downtime deploys and daily snapshots' },
    daysImpact: 2,
  },
];

interface ScaleTier {
  id: string;
  name: { ar: string; en: string };
  capacity: { ar: string; en: string };
  factor: number;
}

const SCALE_TIERS: ScaleTier[] = [
  {
    id: 'mvp',
    name: { ar: 'انطلاق محلي أو تجريبي (Launch / Regional)', en: 'Launch / Regional' },
    capacity: { ar: 'حتى 1,000 مستخدم نشط يومياً', en: 'Up to 1,000 daily active users' },
    factor: 1,
  },
  {
    id: 'growth',
    name: { ar: 'مرحلة التوسع (Growth / Multi-Branch)', en: 'Growth / Multi-Branch' },
    capacity: { ar: 'حتى 25,000 مستخدم نشط يومياً', en: 'Up to 25,000 daily active users' },
    factor: 1.25,
  },
  {
    id: 'enterprise',
    name: { ar: 'مستوى المؤسسات (High-Volume Enterprise)', en: 'High-Volume Enterprise' },
    capacity: { ar: 'أكثر من 50,000 مستخدم مع قواعد بيانات مخصصة', en: '50,000+ users with dedicated DB pools' },
    factor: 1.5,
  },
];

interface ScopeEstimatorProps {
  onSelectScope?: (summary: { category: string; modules: string[]; scale: string }) => void;
}

export const ScopeEstimator: React.FC<ScopeEstimatorProps> = ({ onSelectScope }) => {
  const { isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [selectedCategory, setSelectedCategory] = useState<string>('turnkey');
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'kpi-dash',
    'bilingual',
    'cloud-hosting',
  ]);
  const [selectedScale, setSelectedScale] = useState<string>('mvp');

  const toggleModule = (id: string) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const currentCategory = SYSTEM_CATEGORIES.find((c) => c.id === selectedCategory) || SYSTEM_CATEGORIES[0];
  const currentScale = SCALE_TIERS.find((s) => s.id === selectedScale) || SCALE_TIERS[0];

  // Calculate delivery timeline
  const calculation = useMemo(() => {
    const baseDays = currentCategory.baseWeeks * 5;
    const addedDays = selectedModules.reduce((sum, modId) => {
      const mod = AVAILABLE_MODULES.find((m) => m.id === modId);
      return sum + (mod ? mod.daysImpact : 0);
    }, 0);
    const totalWorkingDays = Math.round((baseDays + addedDays) * currentScale.factor);

    let timelineTextAr = '';
    let timelineTextEn = '';

    if (totalWorkingDays <= 12) {
      timelineTextAr = `${Math.max(5, totalWorkingDays - 2)} إلى ${totalWorkingDays + 2} أيام عمل`;
      timelineTextEn = `${Math.max(5, totalWorkingDays - 2)} to ${totalWorkingDays + 2} business days`;
    } else {
      const weeks = Math.round(totalWorkingDays / 5);
      timelineTextAr = `${Math.max(2, weeks - 1)} إلى ${weeks + 1} أسابيع`;
      timelineTextEn = `${Math.max(2, weeks - 1)} to ${weeks + 1} weeks`;
    }

    return {
      totalWorkingDays,
      timelineAr: timelineTextAr,
      timelineEn: timelineTextEn,
    };
  }, [currentCategory, selectedModules, currentScale]);

  const handleApplyToWizard = () => {
    if (onSelectScope) {
      onSelectScope({
        category: currentCategory.name[isRtl ? 'ar' : 'en'],
        modules: selectedModules.map(
          (mId) => AVAILABLE_MODULES.find((m) => m.id === mId)?.label[isRtl ? 'ar' : 'en'] || mId
        ),
        scale: currentScale.name[isRtl ? 'ar' : 'en'],
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Introduction banner */}
      <div className="glass-card rounded-2xl border border-white/[0.08] p-5 sm:p-6 bg-slate-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-medium">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              <span>{t('حاسبة النطاق والمعمارية', 'Scope & Architecture Estimator')}</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white leading-snug">
              {t('قدّر نطاق مشروعك وجدوله الهندسي فورياً', 'Estimate your scope & engineering timeline')}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
              {t(
                'اختر نموذج النظام والميزات المطلوبة وسعة التشغيل للحصول على تصور فني للجدول الزمني والمعمارية المقترحة.',
                'Select your system paradigm, required modules, and user tier for instant architectural guidance.'
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('turnkey');
              setSelectedModules(['kpi-dash', 'bilingual', 'cloud-hosting']);
              setSelectedScale('mvp');
            }}
            className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-slate-900/60 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            <span>{t('إعادة ضبط', 'Reset')}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: System Category */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600/30 text-xs font-mono text-blue-400 border border-blue-500/40">
                1
              </span>
              {t('نوع النظام والنموذج الهندسي', 'System Type & Architecture Paradigm')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SYSTEM_CATEGORIES.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-4 rounded-xl text-start transition-all border ${
                      isSelected
                        ? 'border-blue-500 bg-blue-600/10 shadow-lg shadow-blue-500/5'
                        : 'border-white/[0.06] bg-slate-900/50 hover:bg-slate-900 hover:border-white/[0.12]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div
                        className={`p-2 rounded-lg ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <IconComponent className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div
                        className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-blue-500 bg-blue-600 text-white' : 'border-slate-700'
                        }`}
                      >
                        {isSelected && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                      </div>
                    </div>
                    <div className="font-medium text-sm text-white mb-1">
                      {isRtl ? cat.name.ar : cat.name.en}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {isRtl ? cat.desc.ar : cat.desc.en}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Step 2: Key Modules */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600/30 text-xs font-mono text-blue-400 border border-blue-500/40">
                2
              </span>
              {t('الوحدات البرمجية والوظائف المطلوبة', 'Operational Modules & Capabilities')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AVAILABLE_MODULES.map((mod) => {
                const isChecked = selectedModules.includes(mod.id);
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => toggleModule(mod.id)}
                    className={`p-3 rounded-xl border text-start transition-all flex items-start gap-3 ${
                      isChecked
                        ? 'border-teal-500/60 bg-teal-500/10'
                        : 'border-white/[0.06] bg-slate-900/40 hover:bg-slate-900'
                    }`}
                  >
                    <div
                      className={`mt-0.5 h-4 w-4 shrink-0 rounded border flex items-center justify-center transition-colors ${
                        isChecked ? 'border-teal-500 bg-teal-500 text-slate-950' : 'border-slate-700 bg-slate-900'
                      }`}
                    >
                      {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <div className="text-xs font-medium text-white">
                        {isRtl ? mod.label.ar : mod.label.en}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {isRtl ? mod.hint.ar : mod.hint.en}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Step 3: Deployment Scale */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600/30 text-xs font-mono text-blue-400 border border-blue-500/40">
                3
              </span>
              {t('سعة التشغيل ومستوى المستخدمين', 'Deployment Scale & User Capacity')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SCALE_TIERS.map((tier) => {
                const isSelected = selectedScale === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedScale(tier.id)}
                    className={`p-3 rounded-xl border text-start transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-600/10'
                        : 'border-white/[0.06] bg-slate-900/40 hover:bg-slate-900'
                    }`}
                  >
                    <div className="text-xs font-medium text-white mb-1">
                      {isRtl ? tier.name.ar : tier.name.en}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-normal">
                      {isRtl ? tier.capacity.ar : tier.capacity.en}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column: Architectural Guidance & Metrics (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="glass-card rounded-2xl border border-white/[0.1] p-6 space-y-6 bg-slate-900/60 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                {t('مخرجات التقييم المعماري', 'Architectural Estimate')}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                {t('ملكية كود 100%', '100% IP Ownership')}
              </span>
            </div>

            {/* Estimated Timeline */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
                <span>{t('المدة التقديرية للإطلاق والتسليم', 'Estimated Delivery Timeline')}</span>
              </div>
              <div className="text-2xl font-display font-bold text-white tracking-tight">
                {isRtl ? calculation.timelineAr : calculation.timelineEn}
              </div>
              <p className="text-xs text-slate-400">
                {selectedCategory === 'turnkey'
                  ? t(
                      'نعتمد على حلولنا الجاهزة المهيئة للبدء الفوري بدون إعادة اختراع العجلة.',
                      'Leverages our proven ready foundation for fast deployment.'
                    )
                  : t(
                      'بناء هندسي مرحلي مع دورات تسليم واضحة وتدقيق برمجي مستمر.',
                      'Staged engineering sprints with verified milestones.'
                    )}
              </p>
            </div>

            {/* Recommended Technical Stack */}
            <div className="space-y-3 pt-4 border-t border-white/[0.08]">
              <div className="text-xs font-medium text-slate-300">
                {t('البنية التقنية الموصى بها', 'Recommended Architecture Stack')}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/[0.05] space-y-0.5">
                  <div className="text-[11px] text-slate-400">{t('الواجهة والمنطق', 'Frontend & App')}</div>
                  <div className="font-mono text-white text-xs font-semibold">Next.js 15 App Router</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/[0.05] space-y-0.5">
                  <div className="text-[11px] text-slate-400">{t('قاعدة البيانات', 'Database')}</div>
                  <div className="font-mono text-white text-xs font-semibold">PostgreSQL (Relational)</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/[0.05] space-y-0.5">
                  <div className="text-[11px] text-slate-400">{t('البيئة والاستضافة', 'Container / Edge')}</div>
                  <div className="font-mono text-white text-xs font-semibold">Docker + Cloudflare</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-white/[0.05] space-y-0.5">
                  <div className="text-[11px] text-slate-400">{t('الأمان والتشفير', 'Security')}</div>
                  <div className="font-mono text-white text-xs font-semibold">Strict CSP & HTTPS</div>
                </div>
              </div>
            </div>

            {/* TCO Advantage Comparison */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-white/[0.08] space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-400">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{t('ميزة ملكية الكود مقابل اشتراكات SaaS', 'Ownership vs SaaS Subscriptions')}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t(
                  'أنت تمتلك الكود وقواعد البيانات وحسابات الاستضافة بالكامل. لا رسوم متكررة لكل مقعد أو لكل معاملة، ولا قيود تقنية تمنعك من التوسع.',
                  'You own all source code and data schemas outright. Zero per-seat recurring licensing costs.'
                )}
              </p>
            </div>

            {/* Action button */}
            <button
              type="button"
              onClick={handleApplyToWizard}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-colors"
            >
              <span>{t('نقل هذا النطاق لمعالج المشروع', 'Apply Scope to Intake Wizard')}</span>
              <ArrowIcon className="h-4 w-4" aria-hidden="true" />
            </button>

            <p className="text-center text-[11px] text-slate-400">
              {t(
                '* نموذج تقديري توضيحي للاسترشاد المعماري — يتم تحديد النطاق النهائي بدقة مع الفريق الهندسي.',
                '* Illustrative estimation — final scope is agreed with our engineering team based on your exact specs.'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
