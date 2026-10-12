# معمارية لوحة الإدارة المتكاملة وعمليات الـ CRUD في نوڤيكسا
# Novixa Admin Dashboard CRUD Architecture & Content Management System

**تاريخ التحديث:** أكتوبر ٢٠٢٦  
**الحالة:** معمارية معتمدة للتنفيذ الفوري

---

## ١. الرؤية الهندسية (Architectural Vision)

تهدف هذه المعمارية إلى تحويل لوحة إدارة نوڤيكسا (`/admin`) من واجهة تقتصر على استعراض استفسارات العملاء إلى **نظام إدارة أعمال وتشغيل رقمي متكامل (Digital Operations & Headless CMS)** يُمكّن المالك وفريق الإدارة من التحكم في كل مفاصل الموقع والمحتوى والمبيعات من خلال عمليات الإنشاء والتعديل والحذف والاستعراض (CRUD):

1. **الطلبات والمبيعات (`Leads Management`):**
   - إضافة عملاء يدوياً، تعديل كافة بيانات التواصل ونطاقات الميزانية، تحويل الحالات، وجدولة المتابعات.
2. **الكتالوج والحلول والخدمات (`Catalog & Services Management`):**
   - إضافة خدمات هندسية جديدة، حلول جاهزة، منتجات سحابية، وقطاعات أعمال، مع إمكانية تعديل المزايا والتسعير ومسارات النشر وحذفها أو أرشفتها.
3. **الأسئلة الشائعة (`FAQs Management`):**
   - إضافة وتعديل وحذف الأسئلة والأجوبة باللغتين العربية والإنجليزية، وتصنيفها حسب الأقسام.
4. **الرؤى والمقالات التقنية (`Insights & Technical Articles`):**
   - إدارة المقالات الهندسية والتحليلات ونشرها وأرشفتها.
5. **معرض المشاريع وحالات الدراسة (`Case Studies & Portfolio`):**
   - إدارة النماذج الهندسية وحالات الدراسة والتفاصيل المعمارية.
6. **برنامج الشركاء والعمولات (`Affiliates & Commissions Ledger`):**
   - تسجيل المسوقين، توثيق الصفقات المرتبطة بهم، احتساب العمولات بنسبة 30% أو اتفاقيات مخصصة، وإدارة دورة الصرف.
7. **المبادرات المجتمعية والهدايا (`Community Initiatives & Grants`):**
   - طرح مبادرات المواقع المجانية للفعاليات وهدايا المطورين، واستقبال وفرز طلبات المتقدمين وتوثيق قرارات القبول والرفض.

---

## ٢. طبقة التخزين الموحدة (`Unified Content Store Architecture`)

لضمان عمل النظام في كافة البيئات (بيئة الإنتاج مع PostgreSQL، وبيئة التطوير المحلي، وبيئة الاختبارات الآلية CI/CD دون الحاجة لقاعدة بيانات حية)، نعتمد نمط التصميم **Repository / Store Pattern**:

```
                  ┌───────────────────────────────┐
                  │    Admin Server Actions /     │
                  │       Admin UI Pages          │
                  └───────────────┬───────────────┘
                                  │
                                  ▼
                  ┌───────────────────────────────┐
                  │      ContentStore Interface   │
                  │  (get, list, create, update,  │
                  │       delete, archive)        │
                  └───────┬───────────────┬───────┘
                          │               │
     If DATABASE_URL set  │               │ In-memory / Fallback
                          ▼               ▼
           ┌──────────────────────┐ ┌──────────────────────┐
           │ PostgresContentStore │ │  MemoryContentStore  │
           │  (Persistent Tables) │ │(Auto-seeded from code│
           └──────────────────────┘ └──────────────────────┘
```

### البذر التلقائي الذكي (`Idempotent Auto-Seeding`):
عند تشغيل النظام لأول مرة أو في وضع الذاكرة، يتم قراءة كافة البيانات الموثوقة الموجودة حالياً في `src/content/data.ts` و `src/content/faq.ts` تلقائياً وضخها في الـ Store. وبذلك:
- لا يفقد النظام أي معلومة أو ميزة حالية.
- تصبح جميع الخدمات والحلول والأسئلة الشائعة فوراً قابلة للتعديل والحذف والإضافة من داخل لوحة الإدارة!

---

## ٣. هيكل البيانات والكيانات (`Entity Schemas`)

### أ) الكتالوج والخدمات (`Catalog Item`):
```typescript
interface CatalogItem {
  id: string;
  kind: 'service' | 'solution' | 'product' | 'industry';
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  slug: string;
  categoryBadge?: { ar: string; en: string };
  tags?: string[];
  features?: string[];
  deliveryTimelineBadge?: { ar: string; en: string };
  publicRoute: string;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
}
```

### ب) الأسئلة الشائعة (`FAQ Item`):
```typescript
interface FaqItem {
  id: string;
  category: 'general' | 'services' | 'delivery' | 'pricing' | 'tech';
  question: { ar: string; en: string };
  answer: { ar: string; en: string };
  order: number;
  status: 'published' | 'draft';
}
```

### ج) الرؤى والمقالات (`Insight Article`):
```typescript
interface InsightItem {
  id: string;
  slug: string;
  title: { ar: string; en: string };
  excerpt: { ar: string; en: string };
  category: { ar: string; en: string };
  readTime: { ar: string; en: string };
  publishedAt: string;
  status: 'published' | 'draft';
}
```

### د) سابقة الأعمال وحالات الدراسة (`Case Study`):
```typescript
interface CaseStudyItem {
  id: string;
  slug: string;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  category: { ar: string; en: string };
  statusLabel: { ar: string; en: string };
  problem: { ar: string; en: string };
  solution: { ar: string; en: string };
  prototypeUrl?: string;
  status: 'published' | 'draft';
}
```

### هـ) الشركاء والعمولات (`Partner & Commission`):
```typescript
interface PartnerItem {
  id: string;
  name: string;
  email: string;
  company?: string;
  referralCode: string;
  defaultCommissionRate: number; // e.g., 30 for 30%
  status: 'active' | 'pending' | 'suspended';
  agreementNotes?: string;
  createdAt: string;
}

interface CommissionItem {
  id: string;
  partnerId: string;
  leadId?: string;
  saleAmountUsd: number;
  commissionRate: number;
  commissionAmountUsd: number;
  status: 'pending_review' | 'approved' | 'paid' | 'disputed' | 'reversed';
  recordedAt: string;
  paidAt?: string;
}
```

### و) المبادرات المجتمعية (`Community Campaign & Application`):
```typescript
interface CampaignItem {
  id: string;
  slug: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  eligibility: { ar: string; en: string };
  quotaLimit?: number;
  status: 'active' | 'closed' | 'draft';
  startDate: string;
  endDate?: string;
}

interface CampaignApplicationItem {
  id: string;
  campaignId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  organizationOrProject: string;
  details: string;
  status: 'new' | 'in_review' | 'accepted' | 'waitlisted' | 'rejected';
  internalNotes?: string;
  submittedAt: string;
}
```

---

## ٤. تدابير الأمان والتحقق الخادم (`Server Security & Validation`)

1. **التحقق من جلسة المسؤول (`requireAdmin`):** جميع مسارات العمليات (`Server Actions`) محمية بدالة الفحص الخادمي المشدد، ولا يمكن لأي مستخدم غير مسجل تنفيذ أي استعلام كتابة أو حذف.
2. **إلزامية اللغتين العربية والإنجليزية:** احتراماً للمبدأ الأساسي (Arabic-First with full English parity)، ترفض خوادم المعالجة أي عنصر ينقصه النص العربي أو النص الإنجليزي.
3. **التأكيد الإلزامي قبل الحذف:** تطلب جميع عمليات الحذف تأكيداً صريحاً (`confirm=yes`) لتفادي أي مسح غير مقصود للبيانات.
4. **تحديث الذاكرة المؤقتة التلقائي (`revalidatePath`):** عند أي تعديل أو إنشاء أو حذف، يتم فوراً تحديث مسارات لوحة الإدارة ومسارات الموقع العامة ذات الصلة.
