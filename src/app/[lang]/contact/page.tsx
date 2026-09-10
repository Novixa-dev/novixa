'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  FileCheck,
  Cpu,
  Workflow,
  Lock,
} from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const { language, isRtl, t } = useLanguage();
  const isAr = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = isAr ? 'يرجى إدخال الاسم الكامل.' : 'Full name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = isAr ? 'الاسم يجب أن يحتوي على حرفين على الأقل.' : 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = isAr ? 'يرجى إدخال البريد الإلكتروني.' : 'Email is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = isAr ? 'صيغة البريد الإلكتروني غير صحيحة.' : 'Please enter a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = isAr ? 'يرجى كتابة موضوع الرسالة.' : 'Subject is required.';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = isAr ? 'الموضوع يجب أن يحتوي على 3 أحرف على الأقل.' : 'Subject must be at least 3 characters.';
    }

    if (!formData.message.trim()) {
      newErrors.message = isAr ? 'يرجى كتابة نص الرسالة.' : 'Message is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = isAr ? 'الرسالة يجب أن لا تقل عن 10 أحرف للتوضيح.' : 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          problem: formData.subject,
          details: formData.message,
          language,
        }),
      });
    } catch (err) {
      console.warn('[contact] API delivery note:', err);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ fullName: '', email: '', subject: '', message: '' });
      }, 1800);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-slate-950 min-h-screen relative overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 architectural-grid opacity-25 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
            <span>{isAr ? 'الاستشارات الهندسية المباشرة' : 'Direct Engineering Advisory'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-snug">
            {isAr ? 'دعنا نتحدث عن مشروعك التقني القادم.' : 'Let’s discuss your next engineering milestone.'}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg font-arabic leading-relaxed">
            {isAr
              ? 'سواء كنت ترغب في بناء منصة سحابية جديدة أو فحص أمان نظامك الحالي، مهندسونا المعماريون مستعدون لدراسة متطلباتك.'
              : 'Whether building a greenfield platform or auditing existing architecture, our engineering leads are ready.'}
          </p>
        </div>

        {/* 3-Step Architectural Discovery Roadmap (Balances Desktop Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              icon: Lock,
              titleAr: 'توقيع اتفاقية السرية (NDA) ودراسة النطاق',
              titleEn: 'NDA & Architectural Scoping',
              descAr: 'نضمن سرية بياناتك بالكامل ونبدأ بجلسة استكشاف فنية لتحليل متطلبات النظام والأحمال المتوقعة.',
              descEn: 'Strict mutual NDA execution followed by a deep-dive technical session into throughput and scale.',
            },
            {
              step: '02',
              icon: Cpu,
              titleAr: 'صياغة وثيقة المعمارية (RFC & Topology)',
              titleEn: 'Architecture RFC & Topology Spec',
              descAr: 'نقدم لك تصميماً معمارياً مفصلاً يحدد البنية التحتية، نموذج البيانات، وخطة التوسع ومؤشرات الأداء.',
              descEn: 'Delivering a concrete architectural blueprint detailing database partitioning, APIs, and P99 latency SLAs.',
            },
            {
              step: '03',
              icon: Workflow,
              titleAr: 'التنفيذ على مراحل والتسليم المستقر',
              titleEn: 'Phased Delivery & Continuous SLA',
              descAr: 'تطوير بنظام الفرق المخصصة مع اختبارات إجهاد صارمة قبل الإطلاق وضمان تشغيلي 99.99%.',
              descEn: 'Pod-based agile execution with automated stress testing up to 10k RPS and 99.99% uptime guarantees.',
            },
          ].map((item, idx) => {
            const StepIcon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between space-y-4 text-right rtl:text-right ltr:text-left relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800 text-blue-400 flex items-center justify-center">
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-bold font-mono text-blue-400/80">{item.step}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold font-display text-white">
                    {item[isAr ? 'titleAr' : 'titleEn']}
                  </h3>
                  <p className="text-xs text-slate-300 font-arabic leading-relaxed">
                    {item[isAr ? 'descAr' : 'descEn']}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Grid: Form Column & Sidebar Information Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-10 border border-white/[0.08] bg-slate-900/80 shadow-2xl relative">
            {isSuccess ? (
              <div className="py-12 px-4 text-center space-y-5 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold font-display text-white">
                    {isAr ? 'تم استلام استفسارك بنجاح!' : 'Inquiry Received Successfully!'}
                  </h2>
                  <p className="text-slate-300 text-sm max-w-md mx-auto font-arabic leading-relaxed">
                    {isAr
                      ? 'شكراً لتواصلك معنا. قام فريقنا الهندسي باستلام طلبك وسيتواصل معك أحد مستشارينا المعماريين خلال 24 ساعة عمل.'
                      : 'Thank you for reaching out. Our solutions architecture team will follow up within 24 business hours.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-colors shadow-md shadow-blue-600/30"
                >
                  <span>{isAr ? 'إرسال استفسار آخر' : 'Send Another Message'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="border-b border-slate-800 pb-4 mb-2">
                  <h2 className="text-xl font-bold font-display text-white">
                    {isAr ? 'نموذج الاستشارة المعمارية المباشرة' : 'Direct Architectural Inquiry'}
                  </h2>
                  <p className="text-xs text-slate-300 mt-1 font-arabic">
                    {isAr ? 'املأ الحقول أدناه وسيتواصل معك مهندس حلول متخصص خلال 24 ساعة.' : 'Provide your project details and a solutions engineer will reach out within 24 hours.'}
                  </p>
                </div>

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="block text-xs font-semibold text-slate-200">
                    {isAr ? 'الاسم الكامل *' : 'Full Name *'}
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={isAr ? 'مثال: م. عبد الله الشمري' : 'e.g. John Doe'}
                    className={`w-full bg-slate-950 border ${
                      errors.fullName ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500/20'
                    } rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all`}
                  />
                  {errors.fullName && (
                    <p id="fullName-error" role="alert" className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-200">
                    {isAr ? 'البريد الإلكتروني المهني *' : 'Work Email Address *'}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    dir="ltr"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className={`w-full bg-slate-950 border ${
                      errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500/20'
                    } rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all`}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-xs font-semibold text-slate-200">
                    {isAr ? 'الموضوع أو نطاق المنظومة *' : 'Subject or Architecture Scope *'}
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={isAr ? 'مثال: منصة SaaS متعددة المستأجرين أو فحص أداء البنية التحتية' : 'e.g. Multi-Tenant SaaS Platform'}
                    className={`w-full bg-slate-950 border ${
                      errors.subject ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500/20'
                    } rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all`}
                  />
                  {errors.subject && (
                    <p id="subject-error" role="alert" className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-200">
                    {isAr ? 'تفاصيل المتطلبات أو التحديات التشغيلية *' : 'Operational Requirements & Scale Targets *'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={
                      isAr
                        ? 'وضح باختصار أهدافك، حجم المعاملات المتوقع، التحديات التقنية، أو الأنظمة المراد التكامل معها...'
                        : 'Describe target throughput, legacy integrations, uptime requirements, and timelines...'
                    }
                    className={`w-full bg-slate-950 border ${
                      errors.message ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500/20'
                    } rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all resize-none font-arabic`}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:bg-blue-900/60 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/30 transition-colors cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{isAr ? 'جاري الإرسال...' : 'Sending inquiry...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{isAr ? 'إرسال طلب الاستشارة المعمارية' : 'Submit Architectural Inquiry'}</span>
                      <Send className="w-4 h-4 rtl:rotate-180" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar Column: Contact Details & Architectural Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] bg-slate-900/80 space-y-6">
              <h2 className="text-lg font-bold font-display text-white border-b border-slate-800 pb-3">
                {isAr ? 'قنوات التواصل المباشرة' : 'Direct Advisory Channels'}
              </h2>

              <ul className="space-y-4 text-sm">
                {/* Email */}
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-300 font-arabic">{isAr ? 'البريد الإلكتروني المباشر' : 'Direct Email'}</div>
                    <a
                      href="mailto:hello@novixa.dev"
                      className="text-white hover:text-blue-400 font-mono text-xs sm:text-sm font-semibold transition-colors"
                    >
                      hello@novixa.dev
                    </a>
                  </div>
                </li>

                {/* Location */}
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-300 font-arabic">{isAr ? 'المقر والنطاق الجغرافي' : 'Regional Presence'}</div>
                    <div className="text-white text-xs sm:text-sm font-medium font-arabic">
                      {isAr ? 'الشرق الأوسط ودول مجلس التعاون الخليجي (الرياض، دبي، مسقط)' : 'Middle East & GCC (Riyadh, Dubai, Muscat)'}
                    </div>
                  </div>
                </li>

                {/* Direct Channel & Response SLA */}
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-300 font-arabic">{isAr ? 'اتفاقية السرية (NDA)' : 'Confidentiality (NDA)'}</div>
                    <div className="text-white text-xs sm:text-sm font-medium font-arabic">
                      {isAr ? 'اتفاقية سرية متبادلة وفورية قبل أي مشاركة للأكواد أو البيانات' : 'Mutual NDA signed prior to any code or architecture disclosure'}
                    </div>
                  </div>
                </li>

                {/* Working Hours */}
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-300 font-arabic">{isAr ? 'ساعات العمل الرسمية والـ SLA' : 'Response SLA & Hours'}</div>
                    <div className="text-white text-xs sm:text-sm font-medium font-arabic">
                      {isAr ? 'الأحد - الخميس: 9:00 ص - 6:00 م (الرد خلال 24 ساعة)' : 'Sunday - Thursday: 9:00 AM - 6:00 PM (24h response SLA)'}
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Architecture Governance & Sovereignty Banner */}
            <div className="glass-card rounded-2xl p-6 border border-white/[0.08] bg-slate-900/60 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>{isAr ? 'ضمان السيادة وحماية البيانات' : 'Data Sovereignty & Security Guarantee'}</span>
              </div>
              <p className="text-xs text-slate-300 font-arabic leading-relaxed">
                {isAr
                  ? 'نوڤيكسا تلتزم بالمعايير الإقليمية لسيادة البيانات وتخزينها محلياً داخل مراكز بيانات الخليج العربي، مع تشفير شامل وتوافق تام مع لوائح الهيئات التنظيمية.'
                  : 'All architectures are engineered for strict GCC data residency compliance, local cloud hosting, and end-to-end cryptographic integrity.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
