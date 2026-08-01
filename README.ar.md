# @miconvert/browser-image-compression

> 🖼️ ضغط صور ذكي في المتصفح — حدد الحجم المستهدف ودع المكتبة تقوم بالباقي.

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **لغات أخرى:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [Bahasa Indonesia](./README.id.md) | [ภาษาไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Italiano](./README.it.md) | [Polski](./README.pl.md) | [Nederlands](./README.nl.md) | [Bahasa Melayu](./README.ms.md) | [Українська](./README.uk.md) | [Svenska](./README.sv.md) | [বাংলা](./README.bn.md)

## الميزات

- 🎯 **ضغط ذكي** — حدد الحجم المستهدف (مثلاً 500 كيلوبايت)، المكتبة تجد الجودة المثلى تلقائياً
- 📐 **تغيير الحجم التلقائي** — تغيير الحجم للعرض/الارتفاع الأقصى مع الحفاظ على النسبة
- 🔄 **إصلاح EXIF** — إصلاح تلقائي للصور المدورة من iPhone/Samsung
- 🖼️ **تحويل WebP** — التحويل إلى صيغ حديثة لملفات أصغر
- ⚡ **Web Worker** — ضغط غير معطّل في خيط خلفي
- 📊 **إشعار التقدم** — عرض تقدم الضغط في الوقت الفعلي
- 💧 **علامة مائية** — إضافة علامات مائية نصية أو صورية
- 📝 **مخرجات Base64** — الحصول على Data URL للمعاينة الفورية

## التثبيت

```bash
npm install @miconvert/browser-image-compression
```

## البداية السريعة

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // الهدف ≤ 1 ميغابايت
  maxWidthOrHeight: 1920,    // تغيير الحجم إذا كان أكبر
  useWebWorker: true,        // خيط خلفي
  onProgress: (p) => console.log(`${p}%`),
});
```

## خيارات API

| الخيار             | النوع      | الافتراضي | الوصف                                    |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | الحجم الأقصى للملف (ميغابايت)            |
| `maxWidthOrHeight` | `number`   | —         | العرض أو الارتفاع الأقصى (بكسل)          |
| `initialQuality`   | `number`   | `1`       | الجودة الأولية (0–1)                     |
| `fileType`         | `string`   | نفسه      | نوع MIME للمخرجات                        |
| `useWebWorker`     | `boolean`  | `true`    | التشغيل في Web Worker                    |
| `onProgress`       | `function` | —         | إشعار التقدم `(%) => void`              |
| `outputType`       | `string`   | `'file'`  | `'file'` → File، `'base64'` → Data URL  |
| `exifOrientation`  | `boolean`  | `true`    | إصلاح EXIF تلقائي                       |
| `watermark`        | `object`   | —         | إعدادات العلامة المائية                   |

## دعم المتصفحات

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 الدعم والإبلاغ عن الأخطاء

> **إذا واجهت أي أخطاء أو مشاكل أو تحتاج إلى مساعدة، يرجى التواصل معنا عبر:**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
>
> نرد على جميع الاستفسارات خلال 24 ساعة. يمكنك أيضاً إنشاء issue على [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues)، لكن للحصول على أسرع استجابة، يرجى استخدام صفحة الاتصال.

## الترخيص

MIT © [Miconvert](https://miconvert.com?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
