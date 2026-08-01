# @miconvert/browser-image-compression

> 🖼️ ব্রাউজারে স্মার্ট ইমেজ কম্প্রেশন — লক্ষ্য ফাইল সাইজ সেট করুন, বাকিটা লাইব্রেরি সামলাবে।

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **অন্যান্য ভাষা:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [العربية](./README.ar.md) | [Bahasa Indonesia](./README.id.md) | [ภาษาไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Italiano](./README.it.md) | [Polski](./README.pl.md) | [Nederlands](./README.nl.md) | [Bahasa Melayu](./README.ms.md) | [Українська](./README.uk.md) | [Svenska](./README.sv.md)

## বৈশিষ্ট্য

- 🎯 **স্মার্ট কম্প্রেশন** — লক্ষ্য সাইজ সেট করুন (যেমন 500KB), লাইব্রেরি সেরা কোয়ালিটি স্বয়ংক্রিয়ভাবে খুঁজে নেবে
- 📐 **স্বয়ংক্রিয় রিসাইজ** — সর্বোচ্চ প্রস্থ/উচ্চতায় ফিট করুন, অনুপাত বজায় রাখুন
- 🔄 **EXIF সংশোধন** — iPhone/Samsung ফটোর রোটেশন স্বয়ংক্রিয় ফিক্স
- 🖼️ **WebP রূপান্তর** — ছোট ফাইলের জন্য আধুনিক ফরম্যাটে রূপান্তর
- ⚡ **Web Worker** — ব্যাকগ্রাউন্ড থ্রেডে নন-ব্লকিং কম্প্রেশন
- 📊 **প্রগ্রেস কলব্যাক** — রিয়েল-টাইম কম্প্রেশন প্রগ্রেস দেখান
- 💧 **ওয়াটারমার্ক** — টেক্সট বা ইমেজ ওয়াটারমার্ক যোগ করুন
- 📝 **Base64 আউটপুট** — তাৎক্ষণিক প্রিভিউর জন্য Data URL পান

## ইনস্টল

```bash
npm install @miconvert/browser-image-compression
```

## দ্রুত শুরু

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // লক্ষ্য ≤ 1MB
  maxWidthOrHeight: 1920,    // বড় হলে রিসাইজ
  useWebWorker: true,        // ব্যাকগ্রাউন্ড থ্রেড
  onProgress: (p) => console.log(`${p}%`),
});
```

## API অপশন

| অপশন               | টাইপ       | ডিফল্ট    | বর্ণনা                                   |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | সর্বোচ্চ ফাইল সাইজ (MB)                 |
| `maxWidthOrHeight` | `number`   | —         | সর্বোচ্চ প্রস্থ বা উচ্চতা (px)          |
| `initialQuality`   | `number`   | `1`       | প্রাথমিক কোয়ালিটি (0–1)                |
| `fileType`         | `string`   | একই       | আউটপুট MIME টাইপ                         |
| `useWebWorker`     | `boolean`  | `true`    | Web Worker-এ চালান                       |
| `onProgress`       | `function` | —         | প্রগ্রেস কলব্যাক `(%) => void`           |
| `outputType`       | `string`   | `'file'`  | `'file'` → File, `'base64'` → Data URL  |
| `exifOrientation`  | `boolean`  | `true`    | EXIF স্বয়ংক্রিয় সংশোধন                 |
| `watermark`        | `object`   | —         | ওয়াটারমার্ক কনফিগারেশন                   |

## ব্রাউজার সাপোর্ট

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 সাহায্য ও বাগ রিপোর্ট

> **যদি আপনি কোনো বাগ, সমস্যা খুঁজে পান বা সাহায্য প্রয়োজন হয়, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন:**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
>
> আমরা সব প্রশ্নের ২৪ ঘন্টার মধ্যে উত্তর দিই। আপনি [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues)-এও issue তৈরি করতে পারেন, তবে দ্রুততম উত্তরের জন্য আমাদের যোগাযোগ পৃষ্ঠা ব্যবহার করুন।

## লাইসেন্স

MIT © [Miconvert](https://miconvert.com?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
