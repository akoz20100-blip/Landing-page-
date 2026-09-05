# Landing Pages — Website Gallery

Website projects collected in one repository, each in its own folder.

## Start here · ابدأ هنا

**Current merged version: [`main`](https://github.com/akoz20100-blip/Landing-page-/tree/main).**

- [Gallery source](index.html)
- [All website folders](landing-pages)
- [Jamal v2](landing-pages/jamal-v2)
- [Eddah](landing-pages/eddah)
- [Atheer](landing-pages/atheer)

The project-page address is https://akoz20100-blip.github.io/Landing-page-/ (capital L). Jamal and Jamal v2 are distinct versions, with editable source retained under `_source/`. Built assets are required for hosting and are not disposable duplicates. The Atheer development branch remains unmerged. The PSMMC stub has unique server code; [PR #4](https://github.com/akoz20100-blip/Landing-page-/pull/4) remains pending.

<details>
<summary>Technical documentation and project background · التفاصيل التقنية</summary>

# مواقع الهبوط — Landing Pages

معرض صفحات الهبوط الاحترافية، مُستضاف على GitHub Pages. كل مشروع في مجلده الخاص
داخل `landing-pages/` ليسهل عرضه ومشاركته مع العملاء وتطويره مستقبلًا.

**الرابط المباشر:** https://akoz20100-blip.github.io/Landing-page-/

## البنية / Structure

```
/
├── index.html                 ← الصفحة الرئيسية (معرض كل مواقع الهبوط)
└── landing-pages/             ← حاوية كل مواقع الهبوط (أضف أي موقع جديد هنا)
    ├── jamal/                 ← جمال — أتيليه الكتان (Vite + React + GSAP + Lenis)
    │   ├── index.html · assets/   ← الموقع المبني الجاهز للعرض
    │   └── _source/           ← المشروع الكامل القابل للتعديل + كل المراجع
    │       ├── src/ · public/ · docs/ · package.json …
    │       └── references/    ← الصور والفيديو والشعار الأصلية (مراجع التصميم)
    └── eddah/                 ← عُدّة — الصيانة المنزلية (Next.js static export)
        ├── index.html · _next/ · brand/ …
        └── sadim-*/           ← نسخ بألوان بديلة (تجارب)
```

## العناوين المباشرة / Live URLs

| الموقع | الرابط |
|--------|--------|
| المعرض الرئيسي | https://akoz20100-blip.github.io/Landing-page-/ |
| جمال (JAMAL) | https://akoz20100-blip.github.io/Landing-page-/landing-pages/jamal/ |
| عُدّة (Eddah) | https://akoz20100-blip.github.io/Landing-page-/landing-pages/eddah/ |

## إضافة موقع هبوط جديد / Add a new landing page

1. أنشئ مجلدًا جديدًا داخل `landing-pages/` (مثال: `landing-pages/<اسم-المشروع>/`).
2. ضع داخله ملفات الموقع الثابتة (HTML/CSS/JS). إن كان المشروع يستخدم Vite اضبط
   `base: '/landing-pages/<اسم-المشروع>/'` قبل البناء (انظر مثال جمال).
3. أضف بطاقة جديدة للموقع في `index.html` الرئيسي.
4. ارفع التغييرات — سينشره GitHub Pages تلقائيًا.

## تعديل موقع جمال / Editing JAMAL

المصدر القابل للتعديل في `landing-pages/jamal/_source/`:

```bash
cd landing-pages/jamal/_source
npm install
npm run dev                     # تطوير محلي على المنفذ 5173
npm run build                   # يبني إلى dist/ بالمسار /landing-pages/jamal/
```

بعد البناء، انسخ محتوى `dist/` إلى `landing-pages/jamal/` (مع إبقاء `_source/`).
المسار مضبوط في `_source/vite.config.ts` (`base`) وكل أصول الصور تُحَل عبر
`_source/src/lib/asset.ts`.

> ملاحظة: `.nojekyll` في الجذر يمنع معالجة Jekyll حتى تُخدَم مجلدات `_next` و`_source`.

</details>
