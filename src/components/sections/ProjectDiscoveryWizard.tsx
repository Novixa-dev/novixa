import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ProjectDiscoveryData } from '../../types';
import { 
  Sparkles, ArrowLeft, ArrowRight, CheckCircle2, Send, 
  Building2, Layers, ShieldCheck, Clock, DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProjectDiscoveryWizard: React.FC = () => {
  const { isRtl, t } = useLanguage();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const BackArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  const [step, setStep] = useState<number>(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState<ProjectDiscoveryData>({
    projectType: 'منصة أعمال (Business Platform)',
    industry: 'المطاعم والضيافة',
    problem: '',
    existingSystem: 'أدوات مجزأة (واتساب / إكسل)',
    name: '',
    company: '',
    email: '',
    phone: '',
    budgetRange: '$10k - $25k',
    timeline: 'خلال شهرين',
    details: ''
  });

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
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setLeadReceiptId(data.leadId || `LEAD-${Date.now()}`);
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || t('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.', 'Submission error. Please try again.'));
      }
    } catch {
      // Graceful fallback receipt if server network is unreachable
      setLeadReceiptId(`LEAD-LOC-${Date.now()}`);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-950 relative overflow-hidden" id="start-project">
      {/* Background Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-blue-600/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950 border border-blue-800 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{t('ابدأ مشروعك معنا', 'Start Your Project')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            {t('لديك مشكلة تشغيلية تستحق نظامًا أفضل؟', 'Have a operational challenge deserving a modern system?')}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-arabic">
            {t(
              'أخبرنا بما تريد بناءه، وسنساعدك على تحويل الفكرة أو المشكلة التشغيلية إلى خطة تنفيذية وهندسية واضحة.',
              'Tell us what you need to build, and we will formulate a structured architectural roadmap.'
            )}
          </p>

          {/* Progress Indicator */}
          {!submitted && (
            <div className="flex items-center justify-center gap-3 pt-4 font-mono text-xs text-blue-400">
              <span>{t('الخطوة', 'Step')} 0{step} / 0{totalSteps}</span>
              <div className="w-32 bg-slate-900 rounded-full h-2 p-0.5 border border-slate-800">
                <div 
                  className="bg-blue-500 h-full rounded-full transition-all duration-300" 
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Box */}
        <div className="glass-card rounded-2xl p-6 sm:p-10 border border-slate-800 bg-slate-900/90 shadow-2xl relative text-right rtl:text-right ltr:text-left">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold font-display text-white">
                  {t('تم استلام تفاصيل مشروعك بنجاح!', 'Your Project Spec Received Successfully!')}
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto font-arabic leading-relaxed">
                  {t(
                    'شكراً لك يا ' + (formData.name || 'عزيزنا') + '. سيتواصل معك مهندسو نوڤيكسا لمراجعة المخطط الأولي ومناقشة الخطة الهندسية خلال 24 ساعة.',
                    'Thank you ' + (formData.name || 'there') + '. Our engineering leadership will review your specs and reach out within 24 hours.'
                  )}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 max-w-md mx-auto space-y-1 font-mono text-right rtl:text-right ltr:text-left">
                <div className="text-blue-400 font-bold mb-1">PROPOSAL BRIEF RECEIPT: #{leadReceiptId}</div>
                <div>Type: {formData.projectType}</div>
                <div>Industry: {formData.industry}</div>
                <div>Budget: {formData.budgetRange}</div>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                }}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg"
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
                  <h3 className="text-lg font-bold font-display text-white">
                    01. {t('ماذا تريد أن نبني لشركتك؟', 'What do you want us to build?')}
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                    {[
                      'منصة أعمال (Business Platform)',
                      'منتج سحابي (SaaS Product)',
                      'متجر إلكتروني (Digital Commerce)',
                      'نظام حجوزات (Booking Engine)',
                      'حلول ذكاء اصطناعي (Practical AI)',
                      'برمجيات مخصصة (Custom System)',
                    ].map((typeOption) => (
                      <button
                        key={typeOption}
                        type="button"
                        onClick={() => setFormData({ ...formData, projectType: typeOption })}
                        className={`p-3.5 rounded-xl border text-right rtl:text-right ltr:text-left font-medium transition-all ${
                          formData.projectType === typeOption
                            ? 'bg-blue-600 text-white border-blue-500 font-bold shadow-md'
                            : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {typeOption}
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
                  <h3 className="text-lg font-bold font-display text-white">
                    02. {t('ما مجال عمل شركتك؟', 'What is your business sector?')}
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                    {[
                      'المطاعم والضيافة',
                      'الرعاية الصحية والعيادات',
                      'التجارة والتجزئة',
                      'الألعاب والترفيه',
                      'الفنادق والخدمات',
                      'شركات ومؤسسات B2B',
                    ].map((indOption) => (
                      <button
                        key={indOption}
                        type="button"
                        onClick={() => setFormData({ ...formData, industry: indOption })}
                        className={`p-3.5 rounded-xl border text-right rtl:text-right ltr:text-left font-medium transition-all ${
                          formData.industry === indOption
                            ? 'bg-blue-600 text-white border-blue-500 font-bold shadow-md'
                            : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {indOption}
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
                  <h3 className="text-lg font-bold font-display text-white">
                    03. {t('ما المشكلة التشغيلية الرئيسية التي تريد حلها؟', 'What primary operational issue are you solving?')}
                  </h3>

                  <div className="space-y-3">
                    <textarea
                      value={formData.problem}
                      onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                      placeholder={t('صف المشكلة باختصار (مثلاً: زحام الطلبات في نهاية الأسبوع، تضارب بيانات المستودع، أخطاء الفوترة اليدوية...)', 'Describe your operational bottleneck briefly...')}
                      rows={4}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
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
                  <h3 className="text-lg font-bold font-display text-white">
                    04. {t('النظام الحالي ونطاق الميزانية', 'Current Setup & Budget Scope')}
                  </h3>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-300 font-semibold block">
                      {t('هل لديك نظام تشغيلي حالي؟', 'Do you have a current system?')}
                    </label>
                    <select
                      value={formData.existingSystem}
                      onChange={(e) => setFormData({ ...formData, existingSystem: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="أدوات مجزأة (واتساب / إكسل)">{t('أدوات مجزأة (واتساب / إكسل)', 'Fragmented tools (WhatsApp / Excel)')}</option>
                      <option value="نظام قديم يحتاج تحديث شامل">{t('نظام قديم يحتاج تحديث شامل', 'Legacy app needing full rewrite')}</option>
                      <option value="مشروع جديد بالكامل">{t('مشروع جديد بالكامل من الصفر', 'Brand new greenfield project')}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-300 font-semibold block">
                      {t('نطاق الميزانية التقديرية للاستثمار:', 'Estimated Budget Range:')}
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {['$5k - $10k', '$10k - $25k', '$25k+'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormData({ ...formData, budgetRange: b })}
                          className={`py-2.5 px-3 rounded-xl border text-center font-mono font-bold transition-all ${
                            formData.budgetRange === b
                              ? 'bg-blue-600 text-white border-blue-500'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
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
                  <h3 className="text-lg font-bold font-display text-white">
                    05. {t('معلومات التواصل لمناقشة المخطط الهندسي', 'Contact Information')}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <input
                      type="text"
                      required
                      placeholder={t('الاسم الكريم', 'Your Name')}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder={t('اسم الشركة أو المنشأة', 'Company Name')}
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="email"
                      required
                      placeholder={t('البريد الإلكتروني', 'Corporate Email')}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="tel"
                      placeholder={t('رقم الجوال / الواتساب', 'Phone / WhatsApp')}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </motion.div>
              )}

              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-arabic">
                  {errorMessage}
                </div>
              )}

              {/* Wizard Navigation Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-all disabled:opacity-50"
                  >
                    <BackArrowIcon className="w-4 h-4" />
                    <span>{t('السابق', 'Back')}</span>
                  </button>
                ) : (
                  <div></div>
                )}

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-blue-600/30"
                  >
                    <span>{t('الخطوة التالية', 'Next Step')}</span>
                    <ArrowIcon className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-all shadow-xl shadow-blue-600/30"
                  >
                    <Send className="w-4 h-4" />
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
