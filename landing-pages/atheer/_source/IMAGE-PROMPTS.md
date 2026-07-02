# أوامر توليد الصور — هوية أثير الجديدة (Painterly / Fine-Art)

مبنية على فحص فعلي لكود الموقع (`template.html` + `build.js`) — هذه هي كل
فتحات الصور (`__IMG_*__`) الموجودة فعليًا في الصفحة، بالضبط بنفس ترتيبها،
مع الصورة الحالية التي تستبدلها كل واحدة.

**الاتجاه الفني الموحّد** (مبني على 3 مراجع المالكة في [`identity-refs/`](identity-refs/)):
رسم/لوحة تعبيرية غنية بملمس فرشاة ظاهر (painterly illustration / gouache) —
وليس صورة فوتوغرافية واقعية. نفس نظام ألوان الموقع الحالي: خلفية داكنة قريبة
من الأسود (`#0e0b0e`)، وردي (`#ef8ab0`)، وردي غامق (`#e2638f`)، ذهبي (`#f3c98a`)،
خوخي (`#ffb89b`) — بس بوسيط لوحي فني بدل الصورة الفوتوغرافية.

> **كيف تستخدم الأوامر:** الصقها في ChatGPT (توليد صور GPT-4o/DALL·E) كما هي،
> واحدة في كل مرة. لو رجعت الصورة بخلفية بيضاء أو حواف بيضاء ضيف: *"full-bleed
> painting, no white margins/border, no frame."* بعد التوليد صدّرها PNG وحوّلها
> WebP بعرض ~1600px على الضلع الطويل (نفس مقاس الصور الحالية في `assets/img/`).

---

## 1) قسم "من أنا" About — `__IMG_ABOUT__`
- **نسبة الأبعاد:** 4:3
- **تستبدل:** `studio-moodboard.webp`
- **الفكرة:** كواليس التصميم — تنسيق لوحة بصرية على الحاسب

```
Editorial painterly illustration, rich gouache-and-ink style with visible
brushstrokes and warm textured canvas grain. A young Middle Eastern female
graphic designer at a minimalist desk in a dim, moody studio, softly lit by
her laptop screen which glows with a rose-pink and gold moodboard of floral
brand imagery. Deep near-black background (#0e0b0e) fading into warm
rose-burgundy shadows, one warm gold rim-light on her hair and shoulder.
Loose expressive brushwork, jewel-tone palette of rose pink, deep burgundy,
warm gold and peach. Generous negative space at top-left for text overlay.
Intimate, focused, creative-flow mood. 4:3 aspect ratio, full-bleed painting,
no white margins, no text, no watermark, no logo.
```

## 2) قسم "تحسين الصور" Enhance — `__IMG_ENHANCE__`
- **نسبة الأبعاد:** 4:3
- **تستبدل:** `bloom-portrait.webp`
- **الفكرة:** صورة محسّنة بالذكاء الاصطناعي — إضاءة وتفاصيل احترافية (before/after)

```
A single split-composition painterly illustration: left half rendered in
flat muted dull tones with low detail, right half in vivid painterly detail
with luminous rose-gold rim light and rich brush texture — a visual
"before/after" of a woman's portrait bathed in golden-hour light, symbolizing
AI photo enhancement. Three-quarter view, soft floral hints in the
background bokeh, deep near-black-to-burgundy backdrop, warm gold and rose
highlights on skin and hair. Fine-art painterly illustration style, visible
brushstrokes. 4:3 aspect ratio, full-bleed painting, no white margins, no
text, no watermark.
```

## 3) بطاقة المعرض 1 — `__IMG_W1__` (وسم: صور AI / AI photos)
- **نسبة الأبعاد:** 4:5 (عمودي)
- **تستبدل:** `ai-gallery.webp`
- **الفكرة:** معرض صور بالذكاء الاصطناعي وسط الزهور

```
Painterly fine-art illustration of a woman's silhouette walking through an
oversized dreamlike gallery of floating rose-pink and gold floral portraits,
as if inside an AI-generated dream gallery. Dense blooming roses and soft
petals drifting in the air, warm gold rim-lighting, deep near-black burgundy
backdrop. Rich textured brushwork like a gouache painting, jewel-tone
palette of rose, gold, peach and deep burgundy. Vertical 4:5 portrait
composition, generous negative space at the bottom third for a caption pill.
Full-bleed painting, no white margins, no text, no watermark.
```

## 4) بطاقة المعرض 2 — `__IMG_W2__` (وسم: شعار وهوية / Branding)
- **نسبة الأبعاد:** 4:5 (عمودي)
- **تستبدل:** `designer-desk.webp`
- **الفكرة:** مساحة تصميم وهوية بلوحة ألوان

```
Painterly illustration of a designer's flat-lay desk from a slightly
elevated angle: scattered brand mood-board swatches in rose pink, gold,
peach and deep burgundy, a sketchbook with a minimalist logo sketch, a cup
of Arabic coffee, a few dried rose petals. Warm directional light from
top-left, deep near-black tabletop, rich painterly texture with visible
brushstrokes like gouache on textured paper. Vertical 4:5 composition,
elegant and editorial. Full-bleed painting, no white margins, no text, no
watermark, no logo.
```

## 5) بطاقة المعرض 3 — `__IMG_W3__` (وسم: تصميم داخلي / Interior)
- **نسبة الأبعاد:** 4:5 (عمودي)
- **تستبدل:** `canvas-bloom.webp`
- **الفكرة:** تنسيق مشهد ومساحة بإضاءة طبيعية

```
Painterly fine-art illustration of a warm, softly lit interior corner
styled for an editorial shoot: a velvet burgundy armchair beside a tall
window with sheer curtains, golden late-afternoon light streaming across a
patterned floor (Andalusian-inspired zellige tiles in teal, cream and
rust), a vase of blush roses on a side table. Rich brushwork, warm painterly
texture, palette of rose, gold, deep teal and burgundy. Vertical 4:5
composition, atmospheric and inviting. Full-bleed painting, no white
margins, no text, no watermark, no people.
```

## 6) بطاقة المعرض 4 — `__IMG_W4__` (وسم: تحسين صور / Enhance)
- **نسبة الأبعاد:** 4:5 (عمودي)
- **تستبدل:** `studio-moodboard.webp` (كانت مكررة — الآن صورة مستقلة)
- **الفكرة:** تحسين تفاصيل وإضاءة الصور

```
Close-up painterly illustration of a hand adjusting warm golden light on a
glowing screen showing a floral portrait mid-retouch, sparks of rose-gold
light particles drifting from the fingertips like magic dust — symbolizing
AI photo enhancement. Deep near-black background with warm rose and gold
glow, rich textured brushwork, jewel-tone palette. Vertical 4:5 composition,
dreamy and precise mood. Full-bleed painting, no white margins, no text, no
watermark.
```

## 7) بطاقة المعرض 5 — `__IMG_W5__` (وسم: محتوى / Content)
- **نسبة الأبعاد:** 4:5 (عمودي)
- **تستبدل:** `ai-gallery.webp` (كانت مكررة — الآن صورة مستقلة)
- **الفكرة:** محتوى بصري جاذب

```
Painterly illustration of a smartphone propped on a tripod, mid-capture of
a styled flat-lay of brand products surrounded by rose petals and warm
props, a soft ring-light glow reflected on the phone screen, in a moody
near-black studio setting with warm rose-gold rim light. Rich gouache-style
brushwork, textured canvas, jewel-tone palette. Vertical 4:5 composition,
editorial content-creation mood. Full-bleed painting, no white margins, no
text, no watermark, no visible logos.
```

## 8) بطاقة المعرض 6 — `__IMG_W6__` (وسم: فيديو / Video)
- **نسبة الأبعاد:** 4:5 (عمودي)
- **تستبدل:** `bloom-portrait.webp` (كانت مكررة — الآن صورة مستقلة)
- **الفكرة:** لقطات سينمائية حالمة

```
Painterly fine-art illustration of a cinema film strip made of dreamy
floral frames — each frame a small vignette of blooming roses, golden light
flares and soft motion blur — arranged diagonally across a deep near-black
burgundy background, evoking a video reel. Rich brushwork, warm
rose-gold-peach palette, atmospheric glow. Vertical 4:5 composition,
cinematic and painterly. Full-bleed painting, no white margins, no text, no
watermark.
```

## 9) خلفية قسم الدعوة للتواصل CTA — `__IMG_CTA__`
- **نسبة الأبعاد:** عريضة/سينمائية (21:9 أو أوسع) — خلفية زخرفية بحتة
- **تستبدل:** `canvas-bloom.webp`
- **الفكرة:** خلفية جوية للـ CTA (بدون محتوى مركزي، فراغ سفلي للنص والزر)

```
Wide atmospheric painterly illustration: an abstract dreamlike garden of
oversized blooming roses in deep burgundy, rose-pink and warm gold,
dissolving into a near-black night sky with soft swirling brushwork like a
Van Gogh night sky, a few warm gold light particles drifting upward. Rich
textured painterly style, cinematic wide composition (21:9), moody and
inviting, generous dark negative space in the lower half for a headline and
button overlay. Full-bleed painting, no white margins, no text, no
watermark, no people.
```

---

## ملاحظات
- الفيديو الخلفي في الهيرو (`assets/hero.mp4`) مش ضمن هذه القائمة — يبقى كما
  هو (فيديو وردي/زهري) إلا إذا طلبتِ استبداله لاحقًا.
- بعد ما تجهزين الصور التسع، خبريني بأسمائها وأربطها في `build.js` (سطر ١٣-٢١)
  بدل الأسماء الحالية — هذه خطوة "إعادة البناء" اللي قلتِ نأجلها لمرحلة التخطيط.
