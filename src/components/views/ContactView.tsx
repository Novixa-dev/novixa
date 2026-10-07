'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { CONTACT_EMAIL, WHATSAPP_URL } from '@/lib/contact-channels';
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Lock,
} from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  serviceNeeded: string;
  timeline: string;
  budgetRange: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  serviceNeeded?: string;
  message?: string;
}

export const ContactView: React.FC = () => {
  const { language, isRtl, t } = useLanguage();
  const isAr = language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    businessType: '',
    serviceNeeded: 'custom-software',
    timeline: '1-month',
    budgetRange: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [receiptId, setReceiptId] = useState('');
  // Spam trap: a real visitor never sees or fills this. Bots that blind-fill
  // every input do, and the API rejects those submissions silently.
  const [honeypot, setHoneypot] = useState('');

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

    if (!formData.phone.trim()) {
      newErrors.phone = isAr ? 'يرجى إدخال رقم الهاتف أو الواتساب للتواصل.' : 'Phone or WhatsApp number is required.';
    }

    if (!formData.message.trim()) {
      newErrors.message = isAr ? 'يرجى توضيح متطلباتك أو طبيعة مشروعك.' : 'Project details are required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = isAr ? 'يرجى كتابة 10 أحرف على الأقل لشرح الفكرة.' : 'Please provide at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          businessType: formData.businessType,
          serviceNeeded: formData.serviceNeeded,
          timeline: formData.timeline,
          budgetRange: formData.budgetRange,
          problem: formData.serviceNeeded,
          details: formData.message,
          website: honeypot,
          language,
        }),
      });

      const data = await response.json().catch(() => null);

      // A submission is only "received" if the server actually accepted it.
      // Reporting success on a 4xx/5xx would tell the visitor a message was
      // delivered that nobody will ever read.
      if (!response.ok || !data?.success) {
        setSubmitError(
          data?.error ||
            t(
              'تعذر إرسال طلبك الآن. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة على hello@novixa.dev.',
              'We could not send your request right now. Please try again, or email us directly at hello@novixa.dev.'
            )
        );
        return;
      }

      setReceiptId(data.receiptId || '');
      setIsSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        businessType: '',
        serviceNeeded: 'custom-software',
        timeline: '1-month',
        budgetRange: '',
        message: '',
      });
    } catch {
      setSubmitError(
        t(
          'تعذر الاتصال بالخادم. تحقق من اتصالك بالإنترنت، أو راسلنا مباشرة على hello@novixa.dev.',
          'Could not reach the server. Check your connection, or email us directly at hello@novixa.dev.'
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-slate-950 min-h-screen relative overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 architectural-grid opacity-25 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800 text-blue-300 text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
            <span>{t('ابدأ مشروعك أو اطلب استشارة', 'Start Your Project or Request Consultation')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-snug">
            {t('دعنا نحول متطلبات أعمالك إلى برمجيات عملية.', 'Let’s turn your operational needs into practical software.')}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg font-arabic leading-relaxed">
            {t(
              'سواء كنت ترغب في بناء نظام برمجي مخصص، تهيئة حل جاهز (مطاعم، حجوزات، عقارات)، أو إعداد بنية تحتية سحابية، فريقنا مستعد لمساعدتك.',
              'Whether you need custom full-stack software, a turnkey ready-made system, cloud deployment, or ongoing maintenance, our engineering leads are ready.'
            )}
          </p>
        </div>

        {/* Main Grid: Form Column & Sidebar Information Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-10 border border-white/[0.08] bg-slate-900/80 shadow-2xl relative text-right rtl:text-right ltr:text-left">
            {isSuccess ? (
              <div className="py-12 px-4 text-center space-y-5 animate-in fade-in zoom-in duration-300 font-arabic">
                <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold font-display text-white">
                    {t('تم استلام طلبك بنجاح!', 'Your request has been received.')}
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    {t(
                      'شكراً لتواصلك معنا. سنراجع تفاصيل مشروعك واحتياجاتك وسيتواصل معك أحد مهندسينا المعماريين.',
                      'Thank you for reaching out. We will review your project details and contact you.'
                    )}
                  </p>
                  {receiptId && (
                    <p className="text-[11px] font-mono text-slate-400 pt-1">
                      {t('رقم الطلب:', 'Reference:')} <span className="text-blue-400">#{receiptId}</span>
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-colors shadow-md cursor-pointer"
                >
                  <span>{t('إرسال طلب أو استفسار آخر', 'Send Another Inquiry')}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="border-b border-slate-800 pb-4 mb-2">
                  <h2 className="text-xl font-bold font-display text-white">
                    {t('نموذج طلب مشروع أو استشارة برمجية', 'Project Inquiry & Software Scoping Form')}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 font-arabic">
                    {t('املأ التفاصيل أدناه وسيقوم فريقنا الهندسي بمراجعة المتطلبات والتواصل معك.', 'Provide your requirements below and our engineering team will follow up directly.')}
                  </p>
                </div>

                {/* Name & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="fullName" className="block text-xs font-semibold text-slate-200">
                      {t('الاسم الكامل *', 'Full Name *')}
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder={isAr ? 'مثال: محمد العمري' : 'e.g. John Smith'}
                      className={`w-full bg-slate-950 border ${
                        errors.fullName ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                      } rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-arabic`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-200">
                      {t('رقم الهاتف / الواتساب *', 'Phone or WhatsApp *')}
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      dir="ltr"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+967..."
                      className={`w-full bg-slate-950 border ${
                        errors.phone ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                      } rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Email & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-200">
                      {t('البريد الإلكتروني *', 'Email Address *')}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      dir="ltr"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className={`w-full bg-slate-950 border ${
                        errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                      } rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <label htmlFor="company" className="block text-xs font-semibold text-slate-200">
                      {t('اسم الشركة أو المؤسسة', 'Company Name (Optional)')}
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={isAr ? 'مثال: شركة الأفق للتجارة' : 'e.g. Horizon Trading'}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-arabic"
                    />
                  </div>
                </div>

                {/* Service Needed & Business Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service Requirement */}
                  <div className="space-y-1.5">
                    <label htmlFor="serviceNeeded" className="block text-xs font-semibold text-slate-200">
                      {t('ما الخدمة أو الحل المطلوب؟ *', 'What Do You Need? *')}
                    </label>
                    <select
                      id="serviceNeeded"
                      name="serviceNeeded"
                      value={formData.serviceNeeded}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-arabic"
                    >
                      <option value="custom-software">{isAr ? 'تطوير برمجيات مخصصة (Custom Software)' : 'Custom Software Development'}</option>
                      <option value="ready-restaurant">{isAr ? 'حل جاهز: نظام المطاعم والمقاهي' : 'Ready Solution: Restaurant & Cafe'}</option>
                      <option value="ready-booking">{isAr ? 'حل جاهز: نظام حجز المواعيد' : 'Ready Solution: Booking & Appointments'}</option>
                      <option value="ready-crm">{isAr ? 'حل جاهز: نظام إدارة المبيعات والعملاء (CRM)' : 'Ready Solution: CRM & Sales'}</option>
                      <option value="ready-inventory">{isAr ? 'حل جاهز: نظام إدارة المخزون والمستودعات' : 'Ready Solution: Inventory Control'}</option>
                      <option value="ready-clinic">{isAr ? 'حل جاهز: نظام العيادات والملف الطبي' : 'Ready Solution: Medical Clinics'}</option>
                      <option value="ready-property">{isAr ? 'حل جاهز: نظام العقارات (Novixa Aqar)' : 'Ready Solution: Real Estate Hub'}</option>
                      <option value="modernization">{isAr ? 'تحديث وتطوير نظام قديم (Modernization)' : 'System Modernization'}</option>
                      <option value="deployment-hosting">{isAr ? 'نشر واستضافة سحابية مدارة' : 'Cloud Deployment & Managed Hosting'}</option>
                      <option value="maintenance">{isAr ? 'صيانة ودعم فني مستمر (SLA)' : 'Maintenance & Ongoing Support'}</option>
                      <option value="consultation">{isAr ? 'استشارة معمارية وتقييم تقني' : 'Technical Architecture Consultation'}</option>
                    </select>
                  </div>

                  {/* Business Type */}
                  <div className="space-y-1.5">
                    <label htmlFor="businessType" className="block text-xs font-semibold text-slate-200">
                      {t('نوع النشاط التجاري', 'Business Vertical')}
                    </label>
                    <input
                      id="businessType"
                      name="businessType"
                      type="text"
                      value={formData.businessType}
                      onChange={handleChange}
                      placeholder={isAr ? 'مثال: مطاعم، عيادة، تجارة جملة، عقار...' : 'e.g. F&B, Healthcare, Retail, PropTech'}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-arabic"
                    />
                  </div>
                </div>

                {/* Timeline & Budget Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Timeline */}
                  <div className="space-y-1.5">
                    <label htmlFor="timeline" className="block text-xs font-semibold text-slate-200">
                      {t('الجدول الزمني المتوقع للإطلاق', 'Estimated Timeline')}
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-arabic"
                    >
                      <option value="asap">{isAr ? 'فوراً (خلال 1 - 2 أسبوع)' : 'Immediately (1–2 weeks)'}</option>
                      <option value="1-month">{isAr ? 'خلال شهر' : 'Within a month'}</option>
                      <option value="1-3-months">{isAr ? 'خلال 1 إلى 3 أشهر' : '1–3 months'}</option>
                      <option value="flexible">{isAr ? 'مرن / قيد التخطيط' : 'Flexible / Planning phase'}</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div className="space-y-1.5">
                    <label htmlFor="budgetRange" className="block text-xs font-semibold text-slate-200">
                      {t('الميزانية التقديرية (اختياري)', 'Estimated Budget (Optional)')}
                    </label>
                    <input
                      id="budgetRange"
                      name="budgetRange"
                      type="text"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      placeholder={isAr ? 'مثال: باقة أساسية، أو ميزانية مخصصة' : 'e.g. Starter tier / Custom quote'}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-arabic"
                    />
                  </div>
                </div>

                {/* Message / Details */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-200">
                    {t('تفاصيل المتطلبات أو التحديات التشغيلية *', 'Project Details & Specific Requirements *')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={
                      isAr
                        ? 'وضح باختصار فكرة مشروعك، عدد الفروع أو المستخدمين، أو الأنظمة المطلوب التكامل معها...'
                        : 'Describe your core workflows, number of locations/users, or tools to integrate...'
                    }
                    className={`w-full bg-slate-950 border ${
                      errors.message ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                    } rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none font-arabic`}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Honeypot — hidden from sighted users and screen readers alike. */}
                <div aria-hidden="true" className="absolute w-px h-px -m-px overflow-hidden opacity-0 pointer-events-none">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {submitError && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-200 text-xs leading-relaxed flex items-start gap-2 font-arabic"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:bg-blue-900/60 disabled:cursor-not-allowed text-white font-semibold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-blue-600/30 transition-colors cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{t('جاري الإرسال...', 'Sending request...')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('إرسال طلب المشروع والاستشارة', 'Submit Project Request')}</span>
                      <Send className="w-4 h-4 rtl:rotate-180" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar Column: Direct Contacts & Governance */}
          <div className="lg:col-span-5 space-y-6 text-right rtl:text-right ltr:text-left">
            
            {/* Quick Contact Card */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/[0.08] bg-slate-900/80 space-y-6">
              <h2 className="text-lg font-bold font-display text-white border-b border-slate-800 pb-3">
                {t('قنوات التواصل المباشرة', 'Direct Advisory Channels')}
              </h2>

              <ul className="space-y-4 text-sm font-arabic">
                {/* Email */}
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">{t('البريد الإلكتروني المباشر', 'Direct Email')}</div>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-white hover:text-blue-400 font-mono text-xs sm:text-sm font-semibold transition-colors"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </li>

                {/* WhatsApp — rendered only when a real number is configured
                    (NEXT_PUBLIC_WHATSAPP_NUMBER). This previously linked to a
                    placeholder number, sending visitors to a dead chat. */}
                {WHATSAPP_URL && (
                  <li className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <WhatsAppIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">{t('المراسلة المباشرة عبر الواتساب', 'Direct WhatsApp Channel')}</div>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 font-mono text-xs sm:text-sm font-semibold transition-colors inline-flex items-center gap-1 mt-0.5"
                      >
                        <span>{t('تواصل معنا عبر الواتساب', 'Chat on WhatsApp')}</span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </li>
                )}

                {/* Location */}
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">{t('النطاق الجغرافي والخدمة', 'Regional Presence')}</div>
                    <div className="text-white text-xs sm:text-sm font-medium">
                      {t('اليمن • المملكة العربية السعودية • الخليج العربي', 'Yemen • Saudi Arabia • GCC Region')}
                    </div>
                  </div>
                </li>

                {/* NDA Pledge */}
                <li className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/60 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">{t('اتفاقية السرية (NDA)', 'Mutual NDA')}</div>
                    <div className="text-white text-xs sm:text-sm font-medium">
                      {t('نوقع اتفاقيات سرية متبادلة لحماية فكرة مشروعك وبياناتك.', 'Mutual NDAs signed before code or business disclosure.')}
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Architecture Governance & Sovereignty Banner */}
            <div className="glass-card rounded-2xl p-6 border border-white/[0.08] bg-slate-900/60 space-y-3 font-arabic">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>{t('ضمان الجودة والسيادة التقنية', 'Engineering & Data Sovereignty Guarantee')}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t(
                  'نوڤيكسا تلتزم بالمعايير الإقليمية لسيادة البيانات مع تشفير شامل للأصول البرمجية وتوفير خيارات الاستضافة المدارة المحلية.',
                  'Novixa builds systems adhering to GCC data residency rules, end-to-end cryptographic encryption, and managed regional deployments.'
                )}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactView;
