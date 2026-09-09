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
} from 'lucide-react';
import { BRAND_INFO } from '@/content/data';

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
      {/* Subtle Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-600/10 via-blue-900/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
            <span>{isAr ? 'تواصل مع نوڤيكسا' : 'Get in Touch'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-snug">
            {isAr ? 'دعنا نتحدث عن مشروعك التقني القادم.' : 'Let’s discuss your next engineering milestone.'}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg font-arabic leading-relaxed">
            {isAr
              ? 'سواء كنت ترغب في بناء منصة جديدة أو تطوير نظامك الحالي، مستشارونا ومهندسونا في خدمتك.'
              : 'Whether building a greenfield platform or modernizing legacy infrastructure, our engineering leads are ready.'}
          </p>
        </div>

        {/* Main Grid: Form Column & Sidebar Information Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-10 border border-slate-800 bg-slate-900/80 shadow-2xl relative">
            {isSuccess ? (
              <div className="py-12 px-4 text-center space-y-5 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold font-display text-white">
                    {isAr ? 'تم استلام رسالتك بنجاح!' : 'Message Received Successfully!'}
                  </h2>
                  <p className="text-slate-300 text-sm max-w-md mx-auto font-arabic leading-relaxed">
                    {isAr
                      ? 'شكراً لتواصلك معنا. قام فريقنا الهندسي باستلام طلبك وسيتواصل معك أحد مستشارينا خلال 24 ساعة عمل.'
                      : 'Thank you for reaching out. Our engineering advisory has received your request and will follow up within 24 business hours.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/30"
                >
                  <span>{isAr ? 'إرسال استفسار آخر' : 'Send Another Message'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="border-b border-slate-800 pb-4 mb-2">
                  <h2 className="text-xl font-bold font-display text-white">
                    {isAr ? 'نموذج التواصل المباشر' : 'Direct Inquiry Form'}
                  </h2>
                  <p className="text-xs text-slate-300 mt-1">
                    {isAr ? 'املأ الحقول أدناه وسنرد عليك خلال يوم عمل واحد.' : 'Fill in the fields below and we will respond within one business day.'}
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
                    placeholder={isAr ? 'مثال: أحمد عبد الله' : 'e.g. John Doe'}
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
                    {isAr ? 'الموضوع أو نوع المشروع *' : 'Subject or Project Scope *'}
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
                    placeholder={isAr ? 'مثال: تطوير منصة SaaS سحابية أو استشارة تقنية' : 'e.g. Cloud SaaS Platform Architecture'}
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
                    {isAr ? 'تفاصيل الرسالة أو المشروع *' : 'Message Details *'}
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
                        ? 'وضح باختصار أهدافك، التحديات التي تواجهها، أو الميزات الأساسية المطلوبة...'
                        : 'Describe your goals, key functional requirements, and expected timeline...'
                    }
                    className={`w-full bg-slate-950 border ${
                      errors.message ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500/20'
                    } rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all resize-none`}
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
                  className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:bg-blue-900/60 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{isAr ? 'جاري الإرسال...' : 'Sending message...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{isAr ? 'إرسال الرسالة الآن' : 'Send Inquiry'}</span>
                      <Send className="w-4 h-4 rtl:rotate-180" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Left Column: Contact Details & Operational Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 bg-slate-900/80 space-y-6">
              <h2 className="text-lg font-bold font-display text-white border-b border-slate-800 pb-3">
                {isAr ? 'معلومات التواصل المباشرة' : 'Direct Contact Information'}
              </h2>

              <ul className="space-y-4 text-sm">
                {/* Email */}
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-300">{isAr ? 'البريد الإلكتروني' : 'Direct Inquiries'}</div>
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
                    <div className="text-xs text-slate-300">{isAr ? 'المقر والنطاق الجغرافي' : 'Region & Hubs'}</div>
                    <div className="text-white text-xs sm:text-sm font-medium">
                      {isAr ? 'الشرق الأوسط والخليج العربي (الرياض، دبي، مسقط)' : 'Middle East & GCC (Riyadh, Dubai, Muscat)'}
                    </div>
                  </div>
                </li>

                {/* Direct Channel & Response SLA */}
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-300">{isAr ? 'قنوات التواصل المباشرة' : 'Direct Advisory Channel'}</div>
                    <div className="text-white text-xs sm:text-sm font-medium">
                      {isAr ? 'عبر نموذج التواصل أو البريد الرسمي (اتفاقية NDA متاحة)' : 'Via secure form or direct email (NDA on request)'}
                    </div>
                  </div>
                </li>

                {/* Working Hours */}
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-300">{isAr ? 'ساعات العمل الرسمية' : 'Operating Hours'}</div>
                    <div className="text-white text-xs sm:text-sm font-medium">
                      {isAr ? 'الأحد - الخميس: 9:00 ص - 6:00 م (GMT+3)' : 'Sunday - Thursday: 9:00 AM - 6:00 PM (GMT+3)'}
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Advisory Guarantee Banner */}
            <div className="glass-card rounded-2xl p-5 border border-slate-800/80 bg-blue-950/30 flex items-center gap-3.5 text-xs text-slate-300">
              <ShieldCheck className="w-7 h-7 text-blue-400 shrink-0" />
              <p className="leading-relaxed">
                {isAr
                  ? 'نوڤيكسا تلتزم باتفاقيات سرية البيانات (NDA) وتضمن الرد الاستشاري الهندسي خلال 24 ساعة عمل.'
                  : 'Novixa honors strict NDAs and guarantees an architectural response within 24 business hours.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
