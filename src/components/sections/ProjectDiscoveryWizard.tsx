'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ProjectDiscoveryData } from '../../types';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Send,
} from 'lucide-react';
import { motion } from 'motion/react';

/**
 * Every visible option pairs an Arabic label with an English one. Previously
 * the option arrays held bare Arabic strings that were rendered verbatim, so
 * `/en` visitors read Arabic buttons — and that same Arabic string was the
 * value emailed to Novixa regardless of the visitor's language.
 */
type Choice = { value: string; ar: string; en: string };

const PROJECT_TYPES: Choice[] = [
  { value: 'business-platform', ar: 'منصة أعمال', en: 'Business Platform' },
  { value: 'saas-product', ar: 'منتج سحابي (SaaS)', en: 'SaaS Product' },
  { value: 'digital-commerce', ar: 'متجر إلكتروني', en: 'Digital Commerce' },
  { value: 'booking-engine', ar: 'نظام حجوزات', en: 'Booking Engine' },
  { value: 'data-automation', ar: 'أتمتة العمليات وتكامل الـ APIs', en: 'Process Automation & APIs' },
  { value: 'custom-system', ar: 'برمجيات مخصصة', en: 'Custom System' },
];

const INDUSTRY_CHOICES: Choice[] = [
  { value: 'hospitality', ar: 'المطاعم والضيافة', en: 'Restaurants & Hospitality' },
  { value: 'healthcare', ar: 'الرعاية الصحية والعيادات', en: 'Healthcare & Clinics' },
  { value: 'retail', ar: 'التجارة والتجزئة', en: 'Commerce & Retail' },
  { value: 'gaming', ar: 'الألعاب والترفيه', en: 'Gaming & Entertainment' },
  { value: 'hotels', ar: 'الفنادق والخدمات', en: 'Hotels & Services' },
  { value: 'b2b', ar: 'شركات ومؤسسات B2B', en: 'B2B Companies' },
];

const EXISTING_SYSTEMS: Choice[] = [
  { value: 'fragmented-tools', ar: 'أدوات مجزأة (واتساب / إكسل)', en: 'Fragmented tools (WhatsApp / Excel)' },
  { value: 'legacy-rewrite', ar: 'نظام قديم يحتاج تحديث شامل', en: 'Legacy app needing a full rewrite' },
  { value: 'greenfield', ar: 'مشروع جديد بالكامل من الصفر', en: 'Brand new greenfield project' },
];

const TIMELINES: Choice[] = [
  { value: 'asap', ar: 'في أقرب وقت ممكن', en: 'As soon as possible' },
  { value: 'within-2-months', ar: 'خلال شهرين', en: 'Within two months' },
  { value: 'this-quarter', ar: 'خلال هذا الربع', en: 'This quarter' },
  { value: 'exploring', ar: 'ما زلنا نستكشف الخيارات', en: 'Still exploring options' },
];

const BUDGET_RANGES = ['$5k - $10k', '$10k - $25k', '$25k+'];

export interface ProjectDiscoveryWizardProps {
  initialDetails?: string;
}

export const ProjectDiscoveryWizard: React.FC<ProjectDiscoveryWizardProps> = ({ initialDetails = '' }) => {
  const { isRtl, t, language } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const BackArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  const [step, setStep] = useState<number>(1);
  const totalSteps = 5;

  const label = (choice: Choice) => (isRtl ? choice.ar : choice.en);
  const labelFor = (choices: Choice[], value: string) => {
    const match = choices.find((choice) => choice.value === value);
    return match ? `${match.en}${match.ar !== match.en ? ` / ${match.ar}` : ''}` : value;
  };

  const [formData, setFormData] = useState<ProjectDiscoveryData>({
    projectType: PROJECT_TYPES[0].value,
    industry: INDUSTRY_CHOICES[0].value,
    problem: '',
    existingSystem: EXISTING_SYSTEMS[0].value,
    name: '',
    company: '',
    email: '',
    phone: '',
    budgetRange: '$10k - $25k',
    timeline: TIMELINES[1].value,
    details: initialDetails,
  });

  React.useEffect(() => {
    if (initialDetails) {
      setFormData((prev) => ({ ...prev, details: initialDetails }));
    }
  }, [initialDetails]);
  // Spam trap — invisible to real visitors, blind-filled by bots.
  const [honeypot, setHoneypot] = useState('');

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [leadReceiptId, setLeadReceiptId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setErrorMessage(t('يرجى كتابة الاسم والبريد الإلكتروني للشركة.', 'Please enter your name and corporate email.'));
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Send the human-readable label, not the internal slug — the inbox
      let utmSource = '';
      let utmMedium = '';
      let utmCampaign = '';
      let referrer = '';
      if (typeof window !== 'undefined') {
        const sp = new URLSearchParams(window.location.search);
        utmSource = sp.get('utm_source') || '';
        utmMedium = sp.get('utm_medium') || '';
        utmCampaign = sp.get('utm_campaign') || '';
        referrer = document.referrer ? document.referrer.slice(0, 500) : '';
      }

      // needs "Booking Engine", not "booking-engine".
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          projectType: labelFor(PROJECT_TYPES, formData.projectType),
          industry: labelFor(INDUSTRY_CHOICES, formData.industry),
          existingSystem: labelFor(EXISTING_SYSTEMS, formData.existingSystem),
          timeline: labelFor(TIMELINES, formData.timeline),
          website: honeypot,
          language,
          source: 'start-project',
          utmSource,
          utmMedium,
          utmCampaign,
          referrer,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setLeadReceiptId(data.receiptId || `NVX-${Date.now()}`);
        setSubmitted(true);
      } else {
        setErrorMessage(
          data.error || t('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.', 'Submission error. Please try again.')
        );
      }
    } catch {
      setErrorMessage(
        t(
          'تعذر الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.',
          'Could not reach the server. Please check your connection and try again.'
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-4 bg-transparent relative" id="start-project">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-10">

          <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
            {t('لديك مشكلة تشغيلية تستحق نظامًا أفضل؟', 'Have an operational challenge deserving a modern system?')}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-arabic">
            {t(
              'أخبرنا بما تريد بناءه، وسنساعدك على تحويل الفكرة أو المشكلة التشغيلية إلى خطة تنفيذية وهندسية واضحة.',
              'Tell us what you need to build, and we will formulate a structured architectural roadmap.'
            )}
          </p>

          {/* Progress Indicator */}
          {!submitted && (
            <div className="flex items-center justify-center gap-3 pt-4 font-mono text-xs text-cyan-700 font-semibold">
              <span>{t('الخطوة', 'Step')} 0{step} / 0{totalSteps}</span>
              <div
                className="w-32 bg-slate-100 rounded-full h-1.5 p-0.5 border border-slate-200"
                role="progressbar"
                aria-valuenow={step}
                aria-valuemin={1}
                aria-valuemax={totalSteps}
                aria-label={t('تقدّم نموذج المشروع', 'Project form progress')}
              >
                <div
                  className="bg-cyan-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Box */}
        <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200/90 bg-white shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)] relative text-right rtl:text-right ltr:text-left">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold font-display text-slate-900">
                  {t('تم استلام تفاصيل مشروعك بنجاح!', 'Your Project Spec Received Successfully!')}
                </h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto font-arabic leading-relaxed">
                  {t(
                    'شكراً لك يا ' + (formData.name || 'عزيزنا') + '. سيتواصل معك مهندسو نوڤيكسا لمراجعة المخطط الأولي ومناقشة الخطة الهندسية خلال 24 ساعة.',
                    'Thank you ' + (formData.name || 'there') + '. Our engineering leadership will review your specs and reach out within 24 hours.'
                  )}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-md mx-auto space-y-1 font-mono text-right rtl:text-right ltr:text-left">
                <div className="text-cyan-800 font-bold mb-1">PROPOSAL BRIEF RECEIPT: #{leadReceiptId}</div>
                <div>Type: {labelFor(PROJECT_TYPES, formData.projectType)}</div>
                <div>Industry: {labelFor(INDUSTRY_CHOICES, formData.industry)}</div>
                <div>Budget: {formData.budgetRange}</div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
              >
                {t('تقديم طلب آخر', 'Submit Another Discovery')}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Project Type */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h2 className="text-base sm:text-lg font-bold font-display text-slate-900">
                    01. {t('ماذا تريد أن نبني لشركتك؟', 'What do you want us to build?')}
                  </h2>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs sm:text-sm">
                    {PROJECT_TYPES.map((choice) => (
                      <button
                        key={choice.value}
                        type="button"
                        aria-pressed={formData.projectType === choice.value}
                        onClick={() => setFormData({ ...formData, projectType: choice.value })}
                        className={`p-3.5 rounded-xl border text-right rtl:text-right ltr:text-left font-medium transition-all cursor-pointer ${
                          formData.projectType === choice.value
                            ? 'bg-[#38BDF8] text-slate-950 border-[#38BDF8] font-bold shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
                        }`}
                      >
                        {label(choice)}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Industry */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h2 className="text-base sm:text-lg font-bold font-display text-slate-900">
                    02. {t('ما مجال عمل شركتك؟', 'What is your business sector?')}
                  </h2>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs sm:text-sm">
                    {INDUSTRY_CHOICES.map((choice) => (
                      <button
                        key={choice.value}
                        type="button"
                        aria-pressed={formData.industry === choice.value}
                        onClick={() => setFormData({ ...formData, industry: choice.value })}
                        className={`p-3.5 rounded-xl border text-right rtl:text-right ltr:text-left font-medium transition-all cursor-pointer ${
                          formData.industry === choice.value
                            ? 'bg-[#38BDF8] text-slate-950 border-[#38BDF8] font-bold shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
                        }`}
                      >
                        {label(choice)}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Operational Problem */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h2 className="text-base sm:text-lg font-bold font-display text-slate-900">
                    03. {t('ما المشكلة التشغيلية الرئيسية التي تريد حلها؟', 'What primary operational issue are you solving?')}
                  </h2>

                  <div className="space-y-3">
                    <textarea
                      value={formData.problem}
                      onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                      placeholder={t('صف المشكلة باختصار (مثلاً: زحام الطلبات في نهاية الأسبوع، تضارب بيانات المستودع، أخطاء الفوترة اليدوية...)', 'Describe your operational bottleneck briefly...')}
                      aria-label={t('وصف المشكلة التشغيلية', 'Operational problem description')}
                      rows={4}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 transition-all font-arabic"
                    ></textarea>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Existing Setup & Budget */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-5"
                >
                  <h2 className="text-base sm:text-lg font-bold font-display text-slate-900">
                    04. {t('النظام الحالي ونطاق الميزانية', 'Current Setup & Budget Scope')}
                  </h2>

                  <div className="space-y-2">
                    <label htmlFor="existing-system" className="text-xs text-slate-700 font-semibold block">
                      {t('هل لديك نظام تشغيلي حالي؟', 'Do you have a current system?')}
                    </label>
                    <select
                      id="existing-system"
                      value={formData.existingSystem}
                      onChange={(e) => setFormData({ ...formData, existingSystem: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 transition-all font-arabic cursor-pointer"
                    >
                      {EXISTING_SYSTEMS.map((choice) => (
                        <option key={choice.value} value={choice.value}>
                          {label(choice)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="timeline" className="text-xs text-slate-700 font-semibold block">
                      {t('الإطار الزمني المستهدف للإطلاق:', 'Target timeline to launch:')}
                    </label>
                    <select
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 transition-all font-arabic cursor-pointer"
                    >
                      {TIMELINES.map((choice) => (
                        <option key={choice.value} value={choice.value}>
                          {label(choice)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs text-slate-700 font-semibold block" id="budget-label">
                      {t('نطاق الميزانية التقديرية للاستثمار:', 'Estimated Budget Range:')}
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-xs" role="group" aria-labelledby="budget-label">
                      {BUDGET_RANGES.map((b) => (
                        <button
                          key={b}
                          type="button"
                          aria-pressed={formData.budgetRange === b}
                          onClick={() => setFormData({ ...formData, budgetRange: b })}
                          className={`py-2.5 px-3 rounded-xl border text-center font-mono font-bold transition-all cursor-pointer ${
                            formData.budgetRange === b
                              ? 'bg-[#38BDF8] text-slate-950 border-[#38BDF8] shadow-sm'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Contact Info */}
              {step === 5 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h2 className="text-base sm:text-lg font-bold font-display text-slate-900">
                    05. {t('معلومات التواصل لمناقشة المخطط الهندسي', 'Contact Information')}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      placeholder={t('الاسم الكريم', 'Your Name')}
                      aria-label={t('الاسم الكريم', 'Your Name')}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 transition-all font-arabic"
                    />
                    <input
                      type="text"
                      autoComplete="organization"
                      placeholder={t('اسم الشركة أو المنشأة', 'Company Name')}
                      aria-label={t('اسم الشركة أو المنشأة', 'Company Name')}
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 transition-all font-arabic"
                    />
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      spellCheck={false}
                      placeholder={t('البريد الإلكتروني', 'Corporate Email')}
                      aria-label={t('البريد الإلكتروني', 'Corporate Email')}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                    <input
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder={t('رقم الجوال / الواتساب', 'Phone / WhatsApp')}
                      aria-label={t('رقم الجوال / الواتساب', 'Phone / WhatsApp')}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-base sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>
                </motion.div>
              )}

              {/* Honeypot — hidden from sighted users and assistive tech alike. */}
              <div aria-hidden="true" className="absolute w-px h-px -m-px overflow-hidden opacity-0 pointer-events-none">
                <label htmlFor="discovery-website">Website</label>
                <input
                  id="discovery-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-arabic"
                >
                  {errorMessage}
                </div>
              )}

              {/* Wizard Navigation Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <BackArrowIcon className="w-3.5 h-3.5" />
                    <span>{t('السابق', 'Back')}</span>
                  </button>
                ) : (
                  <div></div>
                )}

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#38BDF8]/20 cursor-pointer"
                  >
                    <span>{t('الخطوة التالية', 'Next Step')}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] active:bg-[#0284C7] disabled:opacity-50 text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#38BDF8]/20 cursor-pointer"
                  >
                    <Send className="w-4 h-4 rtl:rotate-180" />
                    <span>{isSubmitting ? t('جاري الحفظ مع الهندسة...', 'Submitting Brief...') : t('إرسال للمراجعة الهندسية', 'Submit Project Brief')}</span>
                  </button>
                )}
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
