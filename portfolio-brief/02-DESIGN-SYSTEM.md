# Design System — نظام التصميم

> **What this file is / ما هو هذا الملف**
> This describes **how the portfolio looks & feels** — colors, type, spacing,
> components, motion. It pairs with `01-CONTENT.md` (which describes *what it
> says*). A design/AI tool reads both to build the page.
>
> هذا الملف يصف **الشكل والإحساس** (ألوان، خطوط، مسافات، مكوّنات، حركة). يبقى
> **ثابتاً** حتى لو تغيّر المحتوى. إن كان عندك ملف تصميم خاص، استبدل القيم في
> القسم (Tokens) بقيمك مع إبقاء البنية كما هي.
>
> **Status / الحالة:** Default system, harmonized with the existing gallery
> (dark + gold, RTL, IBM Plex Sans Arabic). Override any token to make it yours.

---

## 0) Design principles — مبادئ التصميم

1. **Let the work shine / العمل هو البطل.** Imagery first; UI stays quiet and premium.
2. **Premium & calm / فخامة وهدوء.** Generous whitespace, restrained palette, one accent.
3. **Bilingual-native / ثنائية اللغة أصالةً.** Looks right in both RTL (default) and LTR.
4. **Fast & accessible / سريعة وسهلة الوصول.** Mobile-first, AA contrast, real focus states.
5. **One clear action / إجراء واحد واضح.** WhatsApp CTA is always within reach.

**Mood:** elegant & modern with a subtle AI/tech edge (soft gold glow on dark).
> ⚠️ If you want a different mood (e.g. light & feminine pastels), change the
> tokens in §1–§3 only — components in §4+ stay the same.

---

## 1) Color tokens — الألوان

**Default (dark, harmonized with the gallery):**
```css
:root {
  /* base */
  --ink:        #0a0a0a;  /* page background        خلفية */
  --surface:    #141414;  /* cards                  بطاقات */
  --surface-2:  #1c1c1c;  /* raised / media         سطح مرتفع */
  --line:       #2a2a2a;  /* borders & dividers     حدود */
  /* text */
  --cream:      #f5f2ec;  /* primary text           نص أساسي */
  --muted:      #8a8a8a;  /* secondary text         نص ثانوي */
  /* accent */
  --gold:       #c09a62;  /* primary accent / CTA   لون مميز */
  --gold-soft:  rgba(192,154,98,0.12); /* glows, tints */
  /* feedback */
  --success:    #5fbf8a;
  --whatsapp:   #25d366;  /* keep WhatsApp green for its button */
}
```
**Ambient glow (used on body in the gallery — keep for continuity):**
```css
background-image:
  radial-gradient(closest-side at 18% 12%, rgba(192,154,98,0.08), transparent),
  radial-gradient(closest-side at 85% 90%, rgba(192,154,98,0.05), transparent);
```

**Optional alternative palette — Light & warm (if you prefer a brighter feel):**
```css
:root {
  --ink:#1b1714; --surface:#ffffff; --surface-2:#f6f1ea; --line:#e7ddcf;
  --cream:#1b1714; --muted:#7a7068; --gold:#b07d3c; --gold-soft:rgba(176,125,60,0.12);
}
```
> Pick **one** palette. Contrast must stay AA (≥4.5:1 body text, ≥3:1 large text).

---

## 2) Typography — الخطوط

- **Arabic + Latin (single family for consistency):** `IBM Plex Sans Arabic`
  — weights 300/400/500/600/700. Loaded via Google Fonts (already used by the gallery):
  ```html
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  ```
- **Optional display accent (headlines only):** a high-contrast Arabic display
  face (e.g. `Tajawal` 800 / `Cairo`) — use sparingly, keep body in Plex.
- **Fallback stack:** `'IBM Plex Sans Arabic', system-ui, 'Segoe UI', sans-serif`

**Type scale (fluid, `clamp()`):**
```
h1 / hero   : clamp(2.5rem, 7vw, 5.5rem)   weight 700  line 1.02  tracking -0.01em
h2 / section: clamp(1.8rem, 4vw, 3rem)     weight 600  line 1.1
h3 / card   : clamp(1.3rem, 2.5vw, 1.6rem) weight 600  line 1.15
lede        : clamp(1rem, 1.6vw, 1.2rem)   weight 300  color --muted
body        : 1rem  weight 400  line 1.6
small/eyebrow: 0.72rem weight 600 letter-spacing 0.18em UPPERCASE color --gold
```
> Body line-height 1.6 suits Arabic well. Avoid weights <300 for Arabic legibility.

---

## 3) Spacing, radius, shadow, layout — المسافات والزوايا والظلال

```css
--container: 1180px;                 /* max content width */
--pad-x: clamp(1.25rem, 4vw, 4rem);  /* page side padding */
--section-y: clamp(2.5rem, 5vw, 6rem);
--gap: clamp(1.25rem, 2.5vw, 2rem);  /* grid gap */
--radius: 18px;                      /* cards */
--radius-pill: 999px;                /* tags, buttons */
--shadow-card: 0 30px 60px -30px rgba(0,0,0,0.8);
--ease: cubic-bezier(0.16, 1, 0.3, 1);
```
- **Grid:** `repeat(auto-fit, minmax(min(100%, 340px), 1fr))` for service/portfolio cards.
- **Breakpoints:** mobile ≤640 • tablet 641–1024 • desktop ≥1025. Mobile-first.

---

## 4) Components — المكوّنات

### Buttons — الأزرار
- **Primary / WhatsApp:** background `--whatsapp` (or `--gold` for non-WhatsApp CTAs), text dark/cream, pill radius, icon + label, hover lift `translateY(-2px)` + glow.
- **Secondary / ghost:** transparent, `1px solid --line`, text `--cream`, hover `border-color: --gold`.
- All buttons: `:focus-visible` ring in `--gold`; min touch target 44×44px.

### Cards (service & portfolio) — البطاقات
Mirror the gallery card so the new page feels native:
- `1px solid --line`, `--radius`, `background: --surface`, `overflow: hidden`.
- Media: `aspect-ratio: 16/10`, `object-fit: cover`, image `filter: saturate(.92) brightness(.82)`.
- Hover: `transform: translateY(-6px)`, `border-color: rgba(192,154,98,.55)`, `box-shadow: --shadow-card`, image `scale(1.06)` + brightens. Transition `.55s var(--ease)`.
- Tag chip: pill, `backdrop-filter: blur(6px)`, uppercase 0.66rem.
- CTA row with arrow icon that slides on hover (in RTL it slides `translateX(-6px)`).

### Navbar — الشريط العلوي
- Sticky, translucent (`backdrop-filter: blur`), thin bottom border `--line`.
- Left (RTL: right): name/logo. Center: anchor links. End: **language toggle** + WhatsApp button.
- Collapses to a hamburger/drawer on mobile.

### Language toggle — مبدّل اللغة
- A clear `ع / EN` switch. Toggling updates `<html lang dir>` (`ar`/`rtl` ↔ `en`/`ltr`),
  swaps all copy, and mirrors layout. Persist choice (localStorage). Default = Arabic/RTL.

### Section header — ترويسة القسم
- Eyebrow (gold, uppercase, with the gallery's `::before` 28px gold rule) + h2 + optional lede.

### Filter chips (portfolio) — مرشّحات
- Pills; active = `--gold` fill; inactive = ghost. Filter cards by category.

### Forms (contact fallback) — النماذج
- Floating labels, `--surface-2` fields, gold focus ring, inline validation. Keep minimal (name, business, message).

---

## 5) Imagery — الصور

- Portfolio images are the hero of the page — show them large and crisp.
- Format **WebP** (fallback JPG), lazy-loaded (`loading="lazy"`), explicit width/height to avoid layout shift.
- Subtle dark gradient overlay on media (as in the gallery) for text legibility on tags.
- Consistent crop ratio per grid (16/10 default); portraits can use 4/5.
- Every image needs **alt text** (bilingual where natural).

---

## 6) Motion — الحركة

- Easing everywhere: `cubic-bezier(0.16, 1, 0.3, 1)`; durations 0.4–0.8s.
- Entrance: fade + 12–20px rise on scroll (IntersectionObserver), staggered for grids.
- Hover: lift + image zoom (see Cards). Keep it subtle and premium.
- **Respect `prefers-reduced-motion: reduce`** — disable transforms/parallax.

---

## 7) RTL / LTR — الاتجاه

- Use logical CSS properties (`margin-inline`, `inset-inline-start`, `padding-block`) so layout mirrors automatically.
- Icons with direction (arrows) flip with `dir`.
- Numbers/dates: keep Western Arabic numerals unless asked otherwise.
- Test both directions before delivery.

---

## 8) Accessibility — الوصول

- Contrast AA minimum. Visible `:focus-visible` outlines (gold).
- Semantic landmarks (`header/nav/main/section/footer`), one `h1`, logical heading order.
- Touch targets ≥44px. Keyboard-operable nav, toggle, filters, and drawer.
- `alt` on images; `aria-label` on icon-only buttons (incl. WhatsApp).

---

## 9) Build & deployment notes — ملاحظات البناء (from CLAUDE.md)

- Served from a sub-path `…/Landing-page-/landing-pages/<slug>/` — **use relative
  asset paths**. (Vite: `base: './'`; Next: set `basePath`/`assetPrefix`, `output:'export'`, `trailingSlash:true`, `images.unoptimized:true`.)
- After building, copy `dist/`/`out/` into the published project folder and keep any `_source/`.
- **Delivery isn't done until a card for this page is added to the root `index.html` gallery** (see CLAUDE.md canonical rule).

---

## 10) How to override with your own design MD — كيف تستبدل بنظامك

If you bring your own design file, you only need to change:
- **§1 Colors**, **§2 Typography**, **§3 spacing/radius** tokens, and the **mood** line in §0.
Keep **§4 components**, **§5–§8** behavior the same so the content from
`01-CONTENT.md` keeps working. القيم تتغيّر، والبنية تبقى.
