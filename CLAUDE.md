# CLAUDE.md — مرجع المشروع / Project Reference

هذا المستودع هو **معرض صفحات الهبوط** الخاص بالمالك، منشور على GitHub Pages
كـ *project page*.

- **الرابط المباشر:** https://akoz20100-blip.github.io/Landing-page-/
  - لاحظ حرف **L الكبير** في `Landing-page-` — الرابط حساس لحالة الأحرف.
  - النشر يتم من فرع **`main`** (workflow: `pages-build-deployment`). أي تغيير
    لا يظهر مباشرةً إلا بعد الدمج في `main`.

## ⭐ القاعدة الأساسية (الذاكرة) — Canonical rule

`index.html` في الجذر هو **صفحة المعرض المرجعية** للمالك: يدخلها في أي وقت
ليجد *كل* مشاريعه في مكان واحد.

> **أي صفحة هبوط جديدة تُضاف داخل `landing-pages/<name>/` يجب أن تُضاف فوراً
> كبطاقة في `index.html`.** هذه ليست خطوة اختيارية — هي جزء من "تسليم" أي مشروع
> جديد. لا تترك مشروعاً بدون بطاقة في الصفحة الرئيسية.

### كيف تضيف بطاقة مشروع

أضف `<a class="card" …>` جديدة داخل `<section class="grid">` **قبل**
العنصر النائب `<div class="card card--soon">`، على نمط البطاقات الموجودة:

```html
<a class="card" href="./landing-pages/<name>/">
  <div class="card__media">
    <span class="card__tag">التصنيف</span>
    <img src="./landing-pages/<name>/<thumbnail>" alt="اسم المشروع" loading="lazy" />
  </div>
  <div class="card__body">
    <h2 class="card__title">اسم المشروع</h2>
    <p class="card__desc">وصف مختصر للمشروع.</p>
    <span class="card__cta">
      زيارة الموقع
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
    </span>
  </div>
</a>
```

- الروابط داخل `index.html` **نسبية** (`./landing-pages/<name>/`) — لا تضع
  مسارات مطلقة هنا.
- استخدم صورة معاينة موجودة فعلاً داخل مجلد المشروع.

## المشاريع الحالية / Current projects

| المشروع | المجلد | البناء | الرابط |
|--------|--------|--------|--------|
| جمال | `landing-pages/jamal/` | Vite + React | `…/Landing-page-/landing-pages/jamal/` |
| جمال v2 | `landing-pages/jamal-v2/` | Vite + React | `…/Landing-page-/landing-pages/jamal-v2/` |
| عُدّة | `landing-pages/eddah/` | Next.js (static export) | `…/Landing-page-/landing-pages/eddah/` |

> مجلدات `eddah/sadim-*` هي تجارب ألوان (نسخ) وليست مشاريع مستقلة — لا تُضاف للمعرض.

## إعدادات البناء (مهمة لتفادي روابط 404)

لأن الموقع يُخدَم من مسار فرعي `/Landing-page-/…`:

- **Vite** (jamal, jamal-v2): استخدم `base: './'` في `vite.config.ts` — روابط
  نسبية تعمل تحت أي مسار. أصول الصور تُحَل عبر `src/lib/asset.ts` + `BASE_URL`.
- **Next.js** (eddah): `basePath: '/Landing-page-/landing-pages/eddah'`,
  `assetPrefix: '/Landing-page-/landing-pages/eddah/'`, `output: 'export'`,
  `trailingSlash: true`, `images: { unoptimized: true }`.

بعد البناء، انسخ المخرجات (`dist/` أو `out/`) إلى مجلد المشروع المنشور مع إبقاء
أي `_source/`.
