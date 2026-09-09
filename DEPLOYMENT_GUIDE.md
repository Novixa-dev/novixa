# Novixa — دليل النشر والتشغيل المباشر (Production Deployment Guide)

يقدم هذا الدليل إرشادات تشغيلية واضحة ومباشرة لفرق التطوير والعمليات (DevOps & Engineering) لنشر موقع شركة **نوڤيكسا (Novixa)** على منصات الإنتاج المختلفة.

---

## 1. المتغيرات البيئية الإلزامية (Environment Variables)

قبل بدء عملية النشر، تأكد من ضبط المتغيرات التالية في منصة الاستضافة:

| اسم المتغير | الوصف | مثال القيمة | إلزامي؟ |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | النطاق الرسمي للموقع المستخدم للروابط الدائمة والسيو وبطاقات OG | `https://novixa.dev` | نعم |
| `RESEND_API_KEY` | مفتاح واجهة برمجة تطبيقات Resend لإرسال رسائل نموذج التواصل | `re_123456789...` | نعم (للبريد الفعلي) |
| `RESEND_FROM_EMAIL` | البريد الإلكتروني المرسل المعتمد في نطاق Resend | `onboarding@resend.dev` أو `system@novixa.dev` | نعم |
| `NOVIXA_CONTACT_EMAIL` | البريد الذي يتلقى استفسارات العملاء وطلبات المشاريع | `hello@novixa.dev` | نعم |

---

## 2. خيارات النشر في بيئة الإنتاج

### الخيار أ: النشر التلقائي عبر Vercel (الأسرع والأمثل)
Next.js مطور من قبل Vercel، لذا يعتبر خيار الاستضافة الأمثل لسرعة استجابة شبكات الـ Edge:

1. ادخل إلى [لوحة تحكم Vercel](https://vercel.com/dashboard) واضغط على **Add New Project**.
2. اختر مستودع `novixa` من حساب GitHub / GitLab.
3. الإعدادات المكتشفة تلقائياً:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `./`
   - **Build Command**: `next build` (أو اتركه تلقائياً)
   - **Output Directory**: `.next`
4. في قسم **Environment Variables**، أضف المتغيرات المذكورة في الجدول أعلاه.
5. اضغط على **Deploy**؛ سينتهي البناء خلال 60-90 ثانية.
6. **ربط النطاق الخاص (Custom Domain)**:
   - توجه إلى **Project Settings > Domains**.
   - أضف `novixa.dev` و `www.novixa.dev`.
   - قم بتحديث سجلات DNS (سجل `A` إلى `76.76.21.21` وسجل `CNAME` لـ `www` إلى `cname.vercel-dns.com`).

---

### الخيار ب: النشر الذاتي عبر خادم Linux VPS (Ubuntu / Debian مع PM2 و Nginx)

إذا كنت تفضل إدارة خادمك الخاص (AWS EC2, Hetzner, DigitalOcean, إلخ):

#### 1. متطلبات الخادم
- خادم يعمل بنظام Ubuntu 22.04 LTS أو 24.04 LTS.
- تثبيت Node.js v20.x و npm:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs git
  sudo npm install -g pm2
  ```

#### 2. سحب المشروع وبنائه
```bash
cd /var/www
git clone <your-repo-url> novixa
cd novixa

# إنشاء ملف البيئة الإنتاجي
cat <<EOF > .env.local
NEXT_PUBLIC_SITE_URL=https://novixa.dev
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=notifications@novixa.dev
NOVIXA_CONTACT_EMAIL=hello@novixa.dev
EOF

# تثبيت الاعتمادات وبناء المشروع
npm ci
npm run build
```

#### 3. تشغيل الخدمة عبر PM2
```bash
pm2 start npm --name "novixa-web" -- start -- -p 3000
pm2 save
pm2 startup
```

#### 4. إعداد Nginx كخادم وسيط عكسي (Reverse Proxy) مع شهادة SSL
أنشئ ملف الإعداد في Nginx:
```bash
sudo nano /etc/nginx/sites-available/novixa
```
أضف الإعدادات التالية:
```nginx
server {
    server_name novixa.dev www.novixa.dev;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
فعّل الموقع واطلب شهادة Let's Encrypt المجانية:
```bash
sudo ln -s /etc/nginx/sites-available/novixa /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d novixa.dev -d www.novixa.dev
```

---

### الخيار ج: النشر باستخدام حاويات Docker

تم تجهيز المشروع بملف `Dockerfile` متعدد المراحل (Multi-stage) معزول ومحمي:

1. **بناء الصورة وتشغيلها**:
   ```bash
   docker build -t novixa-web:latest .
   docker run -d --name novixa-app -p 3000:3000 \
     --env-file .env.local \
     --restart always \
     novixa-web:latest
   ```

2. **تشغيل متكامل عبر Docker Compose** (`docker-compose.yml`):
   ```yaml
   version: '3.8'
   services:
     web:
       build: .
       container_name: novixa-production
       restart: always
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
         - NEXT_PUBLIC_SITE_URL=https://novixa.dev
         - RESEND_API_KEY=${RESEND_API_KEY}
         - RESEND_FROM_EMAIL=notifications@novixa.dev
         - NOVIXA_CONTACT_EMAIL=hello@novixa.dev
   ```

---

## 3. قائمة التحقق النهائية بعد الإطلاق (Post-Launch Verification Checklist)

- [ ] فحص فتح النطاق الرئيسي `https://novixa.dev` والتأكد من التحويل التلقائي للغة العربية الافتراضية `https://novixa.dev/ar`.
- [ ] فحص تبديل اللغة إلى الإنجليزية `/en` والتأكد من انقلاب الاتجاه إلى LTR بسلاسة.
- [ ] فحص صفحة الفريق `/ar/team` والتأكد من ظهور بطاقات الأعضاء الثمانية وعمل روابط السوشيال ميديا.
- [ ] فحص صفحة الاتصال `/ar/contact` وإجراء تجربة إرسال رسالة والتأكد من حالة النجاح.
- [ ] اختبار خريطة الموقع `https://novixa.dev/sitemap.xml` للتأكد من احتوائها على الروابط والبدائل اللغوية.
- [ ] اختبار ملف الروبوتات `https://novixa.dev/robots.txt`.
- [ ] اختبار بطاقة المشاركة في واتساب وتويتر للتأكد من ظهور شعار وعنوان نوڤيكسا عبر `/opengraph-image`.
