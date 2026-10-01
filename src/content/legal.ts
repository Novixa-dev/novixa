/**
 * Privacy and terms copy.
 *
 * These exist because a production business site needs them: Search Console,
 * ad platforms and most corporate procurement checks all look for them, and
 * their absence reads as an unfinished site.
 *
 * Deliberately narrow. The site collects exactly one thing — what a visitor
 * types into the project form — so the policy describes that and nothing else.
 * It does not claim certifications, audit standards or legal jurisdictions
 * that have not been established. `LEGAL_REVIEW_PENDING` marks that this is
 * engineering-authored copy describing real system behaviour, not reviewed
 * legal advice.
 */

export const LEGAL_REVIEW_PENDING = true;

export interface LegalSection {
  heading: { ar: string; en: string };
  body: { ar: string[]; en: string[] };
}

export interface LegalDocument {
  slug: 'privacy' | 'terms';
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  /** ISO date of the last substantive change. */
  updated: string;
  sections: LegalSection[];
}

export const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    slug: 'privacy',
    title: { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
    description: {
      ar: 'ما الذي نجمعه من هذا الموقع، ولماذا، وكم نحتفظ به، وكيف تطلب حذفه.',
      en: 'What this site collects, why, how long it is kept, and how to have it deleted.',
    },
    updated: '2026-09-29',
    sections: [
      {
        heading: { ar: 'ما الذي نجمعه', en: 'What we collect' },
        body: {
          ar: [
            'نجمع فقط ما تكتبه بنفسك في نموذج «ابدأ مشروعك» أو نموذج التواصل: الاسم، البريد الإلكتروني، رقم الهاتف أو الواتساب، اسم الشركة إن ذكرته، ووصف احتياجك ومشكلتك التشغيلية.',
            'لا نطلب ولا نخزّن بيانات بطاقات دفع على هذا الموقع، ولا نستخدم ملفات تعريف ارتباط للتتبع الإعلاني أو لبناء ملفات اهتمامات.',
            'تُسجَّل بيانات تقنية أساسية عند الطلب — مثل عنوان IP المُرسِل — لغرض واحد: الحد من إرسال النماذج الآلية المتكررة. لا تُستخدم لتحديد هويتك ولا تُربط بملفك.',
          ],
          en: [
            'We collect only what you type into the "Start your project" or contact form: your name, email, phone or WhatsApp number, company name if you give one, and your description of your need and operational problem.',
            'We do not request or store payment card details on this site, and we do not use cookies for advertising tracking or interest profiling.',
            'Basic technical data is recorded with a submission — such as the sending IP address — for one purpose: limiting repeated automated form submissions. It is not used to identify you and is not tied to a profile.',
          ],
        },
      },
      {
        heading: { ar: 'لماذا نجمعه', en: 'Why we collect it' },
        body: {
          ar: [
            'لسبب واحد: الرد على طلبك ومناقشة مشروعك. لا نبيع بياناتك ولا نشاركها مع أطراف تسويقية.',
            'نرسل إليك رسالة تأكيد استلام على البريد الذي كتبته، ثم نتواصل معك بشأن طلبك تحديداً. لا نضيفك إلى قائمة بريدية دون طلب منك.',
          ],
          en: [
            'For one reason: to answer your request and discuss your project. We do not sell your data and we do not share it with marketing parties.',
            'We send an acknowledgement to the address you provided, then contact you about your specific request. We do not add you to a mailing list without you asking.',
          ],
        },
      },
      {
        heading: { ar: 'من يطّلع عليه', en: 'Who sees it' },
        body: {
          ar: [
            'فريق نوڤيكسا الذي يعمل على طلبك.',
            'مزوّد خدمة البريد الذي نستخدمه لتوصيل الرسائل (Resend). يمرّ محتوى رسالتك عبره لغرض التوصيل فقط.',
            'مزوّد الاستضافة الذي يشغّل هذا الموقع.',
            'لا طرف رابع غير ذلك.',
          ],
          en: [
            'The Novixa team working on your request.',
            'The email provider we use to deliver messages (Resend). Your message content passes through it for delivery only.',
            'The hosting provider that runs this site.',
            'No third party beyond these.',
          ],
        },
      },
      {
        heading: { ar: 'كم نحتفظ به وكيف تحذفه', en: 'Retention and deletion' },
        body: {
          ar: [
            'نحتفظ بمراسلات الطلب ما دامت المحادثة قائمة أو المشروع قائماً.',
            'يمكنك في أي وقت أن تطلب نسخة مما لدينا عنك، أو تصحيحه، أو حذفه بالكامل، بمراسلتنا على البريد المذكور أدناه. ننفّذ الطلب دون اشتراط سبب.',
          ],
          en: [
            'We keep enquiry correspondence for as long as the conversation or the project is live.',
            'You may at any time request a copy of what we hold about you, have it corrected, or have it deleted entirely, by writing to the address below. We act on the request without requiring a reason.',
          ],
        },
      },
      {
        heading: { ar: 'الأمان', en: 'Security' },
        body: {
          ar: [
            'كل الاتصال بهذا الموقع مشفّر عبر HTTPS، ورؤوس الأمان مفعّلة على مستوى الخادم.',
            'لا نصرّح بامتلاك شهادات امتثال رسمية لم نحصل عليها. ما نصفه هنا هو ما ينفّذه النظام فعلياً.',
          ],
          en: [
            'All traffic to this site is encrypted over HTTPS, and security headers are enforced at the server level.',
            'We do not claim formal compliance certifications we have not obtained. What is described here is what the system actually does.',
          ],
        },
      },
    ],
  },
  {
    slug: 'terms',
    title: { ar: 'شروط الاستخدام', en: 'Terms of Use' },
    description: {
      ar: 'شروط استخدام هذا الموقع، وما تعنيه — وما لا تعنيه — المحتويات المعروضة عليه.',
      en: 'The terms for using this site, and what the material on it does — and does not — represent.',
    },
    updated: '2026-09-29',
    sections: [
      {
        heading: { ar: 'طبيعة هذا الموقع', en: 'What this site is' },
        body: {
          ar: [
            'هذا موقع تعريفي لشركة نوڤيكسا لهندسة البرمجيات. محتواه وصف لما نقدمه ولمنهجيتنا في العمل.',
            'المحتوى هنا ليس عرض سعر ملزماً ولا عقداً. أي التزام متبادل ينشأ فقط من عقد مكتوب وموقّع بين الطرفين.',
          ],
          en: [
            'This is the informational site of Novixa, a software engineering company. Its content describes what we offer and how we work.',
            'Nothing here is a binding quotation or a contract. Mutual obligation arises only from a written, signed agreement between the parties.',
          ],
        },
      },
      {
        heading: { ar: 'الأرقام والعروض التوضيحية', en: 'Figures and demonstrations' },
        body: {
          ar: [
            'لوحة التشغيل التفاعلية على هذا الموقع تعرض بيانات مولّدة لأغراض التوضيح فقط. لا تمثل نتائج أي عميل ولا تُنسب إلى أي جهة.',
            'الأعمال المعروضة في قسم «الأعمال» موسومة بوضوح بنوعها — عرض توضيحي لمنتج، أو معمارية مفاهيمية، أو نموذج هندسي أولي — وليست ادعاءً بمشاريع عملاء منجزة ما لم يُذكر ذلك صراحة.',
            'مؤشرات مثل مدة التسليم ومستوى الجاهزية تصف ما نلتزم به تعاقدياً في الظروف المتفق عليها، لا ضماناً مطلقاً في كل الحالات.',
          ],
          en: [
            'The interactive console on this site shows generated data for illustration only. It does not represent any client’s results and is not attributed to any organisation.',
            'Items in the Work section are explicitly labelled by type — product demonstration, concept architecture, or engineering prototype — and are not a claim of completed client projects unless stated as such.',
            'Figures such as delivery windows and availability targets describe what we commit to contractually under agreed conditions, not an absolute guarantee in every circumstance.',
          ],
        },
      },
      {
        heading: { ar: 'الملكية الفكرية', en: 'Intellectual property' },
        body: {
          ar: [
            'اسم نوڤيكسا وشعارها وتصميم هذا الموقع ونصوصه مملوكة للشركة.',
            'أما ما نبنيه لك: تُسلَّم ملكية الكود المصدري للمشروع إليك بالكامل وفق ما ينص عليه عقد المشروع.',
          ],
          en: [
            'The Novixa name, logo, and this site’s design and copy belong to the company.',
            'What we build for you is different: full ownership of the project’s source code transfers to you as set out in the project contract.',
          ],
        },
      },
      {
        heading: { ar: 'حدود المسؤولية', en: 'Limits of liability' },
        body: {
          ar: [
            'نبذل جهداً معقولاً لإبقاء معلومات هذا الموقع دقيقة ومحدّثة، لكننا لا نضمن خلوها من الأخطاء أو استمرار توفر الموقع دون انقطاع.',
            'مسؤوليتنا تجاه أي مشروع محددة بما ينص عليه عقد ذلك المشروع.',
          ],
          en: [
            'We make reasonable effort to keep this site accurate and current, but we do not warrant it free of error or continuously available.',
            'Our liability on any project is governed by that project’s contract.',
          ],
        },
      },
      {
        heading: { ar: 'التغييرات على هذه الشروط', en: 'Changes to these terms' },
        body: {
          ar: [
            'قد نحدّث هذه الصفحة. تاريخ آخر تحديث مثبت أعلاها، والنسخة المنشورة هي السارية.',
          ],
          en: [
            'We may update this page. The last-updated date is shown at the top, and the published version is the one in effect.',
          ],
        },
      },
    ],
  },
];

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return LEGAL_DOCUMENTS.find((doc) => doc.slug === slug);
}
