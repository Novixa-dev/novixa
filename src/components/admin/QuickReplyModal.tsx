'use client';

import React, { useState } from 'react';
import { Mail, Phone, Copy, Check, MessageSquare, X } from 'lucide-react';
import type { AdminLang } from '@/app/admin/i18n';
import type { Lead } from '@/lib/leads';

interface Template {
  id: string;
  title: { ar: string; en: string };
  subject: { ar: string; en: string };
  body: { ar: string; en: string };
}

const TEMPLATES: Template[] = [
  {
    id: 'discovery',
    title: {
      ar: 'دعوة لجلسة استكشاف وتحديد النطاق (Discovery Call)',
      en: 'Initial Discovery Call Invitation',
    },
    subject: {
      ar: 'نوڤيكسا | بخصوص طلبكم رقم {receiptId} — تحديد نطاق المشروع',
      en: 'Novixa | Re: Enquiry {receiptId} — Architecture & Scope Call',
    },
    body: {
      ar: `السلام عليكم {name}،

شكراً لتواصلكم مع نوڤيكسا بخصوص مشروع {project}. 

يسعدنا في الفريق الهندسي الاطلاع على المتطلبات التشغيلية لنظامكم. نود جدولة جلسة استكشاف ومواءمة معمارية سريعة (15–20 دقيقة) لتحديد:
1. النطاق البرمجي الأساسي والأولويات التشغيلية.
2. معمارية البيانات والربط مع الأنظمة الحالية.
3. التقدير الزمني والمراحل المرحلية للإطلاق.

يرجى إعلامنا بالموعد الأنسب لكم، أو الرد مباشرة عبر هذا البريد لتحديد الموعد.

مع خالص التحية،
فريق هندسة البرمجيات — نوڤيكسا
novixa.dev`,
      en: `Dear {name},

Thank you for reaching out to Novixa regarding {project}.

Our engineering team reviewed your enquiry and would love to schedule a concise discovery & architecture scoping session (15–20 mins) to clarify:
1. Core software scope and operational priorities.
2. Data architecture and integrations with existing systems.
3. Estimated milestones and deployment timeline.

Please let us know which day and time works best for you this week.

Best regards,
Novixa Engineering Team
novixa.dev`,
    },
  },
  {
    id: 'questions',
    title: {
      ar: 'استفسار عن المتطلبات والأنظمة الحالية',
      en: 'Technical Requirements & Setup Clarifications',
    },
    subject: {
      ar: 'نوڤيكسا | استفسارات فنية حول مشروع {project}',
      en: 'Novixa | Technical clarifications for {project}',
    },
    body: {
      ar: `مرحباً {name}،

شكراً لتواصلكم المستمر مع نوڤيكسا بخصوص {project}.

لإعداد وثيقة النطاق الهندسي والتقدير الدقيق للتكلفة والجدول الزمني، نود الاستفسار عن بعض النقاط الفنية:
1. هل هناك قاعدة بيانات أو نظام حالي ترغبون في ترحيل بياناته؟
2. ما هو العدد المتوقع للمستخدمين أو العمليات اليومية في المرحلة الأولى؟
3. هل توجد أي متطلبات خاصة ببوابات الدفع أو الربط مع مزودي خدمات محليين؟

نتطلع لتوضيحاتكم لمساعدتنا في تقديم المعمارية الأنسب لنموذج عملكم.

مع التقدير،
نوڤيكسا للبرمجيات`,
      en: `Hello {name},

Thank you for contacting Novixa regarding {project}.

To prepare an accurate architectural scope document and timeline, could you please clarify:
1. Are there legacy systems or existing databases that need migration?
2. What is the anticipated transaction volume or user count for the initial release?
3. Are there specific payment gateways or regional integrations required?

Looking forward to your guidance so we can tailor the most practical architecture for your workflow.

Warm regards,
Novixa Engineering`,
    },
  },
  {
    id: 'ready_solution',
    title: {
      ar: 'تفاصيل الحل الجاهز وتجربة العرض الحي',
      en: 'Ready Solution & Live Demo Coordination',
    },
    subject: {
      ar: 'نوڤيكسا | تفاصيل النظام الجاهز وجدولة العرض التوضيحي',
      en: 'Novixa | Ready Solution Details & Interactive Demo',
    },
    body: {
      ar: `السلام عليكم {name}،

شكراً لاهتمامكم بحلول نوڤيكسا البرمجية الجاهزة.

الأنظمة الجاهزة لدينا (نقاط البيع والمطاعم، المحركات الحجز، إدارة العقارات، والمخازن) مصممة لتطلق خلال 5 إلى 14 يوماً مع ملكية كاملة للكود والبيانات واستضافة سحابية مدارة.

يسعدنا ترتيب عرض توضيحي مباشر (Live Demo) لتجربة لوحة التشغيل وتخصيص النظام حسب هويتكم التشغيلية.

متى يناسبكم ترتيب العرض التوضيحي؟

تحياتنا،
فريق نوڤيكسا`,
      en: `Hello {name},

Thank you for your interest in Novixa's ready business platforms.

Our ready-to-deploy platforms (Restaurant POS/KDS, booking engines, property and inventory suites) are built for rapid deployment within 5–14 days, offering 100% code ownership and managed infrastructure.

We would be pleased to walk you through a live demonstration of the operations console and review your branding requirements.

When would be a convenient time for a quick walkthrough?

Best regards,
Novixa Team`,
    },
  },
];

export function QuickReplyModal({
  lead,
  lang,
}: {
  lead: Lead;
  lang: AdminLang;
}) {
  const [open, setOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(TEMPLATES[0].id);
  const [copied, setCopied] = useState(false);

  const t = (ar: string, en: string) => (lang === 'ar' ? ar : en);
  const template = TEMPLATES.find((tpl) => tpl.id === selectedTemplateId) || TEMPLATES[0];

  const projectName = lead.projectType || lead.serviceNeeded || lead.company || t('المنظومة الرقمية', 'Digital Platform');
  const replaceVars = (text: string) =>
    text
      .replace(/{name}/g, lead.name)
      .replace(/{receiptId}/g, lead.receiptId)
      .replace(/{company}/g, lead.company || lead.name)
      .replace(/{project}/g, projectName);

  const subject = replaceVars(template.subject[lang]);
  const body = replaceVars(template.body[lang]);
  const mailtoUrl = `mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const cleanPhone = lead.phone ? lead.phone.replace(/[^\d]/g, '') : '';
  const waUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(body)}`
    : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-xl border border-blue-500/30 bg-blue-600/10 px-3.5 py-2 text-xs font-semibold text-blue-300 hover:bg-blue-600/20 hover:text-white transition-colors"
      >
        <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
        {t('قوالب الرد السريع', 'Quick reply templates')}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={t('قوالب الرد السريع', 'Quick reply templates')}
        >
          <div className="w-full max-w-2xl rounded-2xl border border-white/[0.1] bg-slate-900 p-6 shadow-2xl space-y-5 text-right rtl:text-right ltr:text-left">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-400" aria-hidden="true" />
                <h3 className="font-display text-base font-bold text-white">
                  {t('قوالب الرد المهنية الجاهزة', 'Professional Reply Templates')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-white/[0.05] hover:text-white"
                aria-label={t('إغلاق', 'Close')}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Template selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                {t('اختر نموذج الرد المناسب:', 'Select response template:')}
              </label>
              <select
                value={selectedTemplateId}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                className="w-full rounded-xl border border-white/[0.1] bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {TEMPLATES.map((tpl) => (
                  <option key={tpl.id} value={tpl.id}>
                    {tpl.title[lang]}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject preview */}
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-400">{t('موضوع الرسالة:', 'Subject:')}</span>
              <p className="rounded-lg bg-slate-950 px-3 py-2 text-xs font-mono text-slate-200 border border-white/[0.04]">
                {subject}
              </p>
            </div>

            {/* Body preview */}
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-slate-400">{t('نص الرسالة:', 'Message body:')}</span>
              <textarea
                readOnly
                rows={8}
                value={body}
                className="w-full rounded-xl border border-white/[0.06] bg-slate-950 p-3 text-xs leading-relaxed text-slate-200 font-sans focus:outline-none resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.1] px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/[0.05] hover:text-white transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-teal-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? t('تم النسخ للحافظة', 'Copied to clipboard') : t('نسخ النص', 'Copy body text')}
              </button>

              <div className="flex items-center gap-2">
                {waUrl && (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-teal-500/30 bg-teal-600/10 px-3.5 py-2 text-xs font-semibold text-teal-300 hover:bg-teal-600/20 hover:text-white transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    {t('إرسال عبر واتساب', 'Send via WhatsApp')}
                  </a>
                )}
                <a
                  href={mailtoUrl}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-sm"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  {t('فتح في عميل البريد', 'Open in Mail App')}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
