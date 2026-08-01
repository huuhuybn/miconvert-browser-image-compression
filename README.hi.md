# @miconvert/browser-image-compression

> 🖼️ स्मार्ट ब्राउज़र-साइड इमेज कंप्रेशन — लक्ष्य फ़ाइल साइज़ सेट करें, बाकी लाइब्रेरी संभाल लेगी।

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **अन्य भाषाएँ:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [العربية](./README.ar.md) | [Bahasa Indonesia](./README.id.md) | [ภาษาไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Italiano](./README.it.md) | [Polski](./README.pl.md) | [Nederlands](./README.nl.md) | [Bahasa Melayu](./README.ms.md) | [Українська](./README.uk.md) | [Svenska](./README.sv.md) | [বাংলা](./README.bn.md)

## विशेषताएँ

- 🎯 **स्मार्ट कंप्रेशन** — लक्ष्य साइज़ सेट करें (जैसे 500KB), लाइब्रेरी सबसे अच्छी क्वालिटी खोज लेगी
- 📐 **ऑटो रीसाइज़** — अधिकतम चौड़ाई/ऊंचाई में फिट करें, पहलू अनुपात बनाए रखें
- 🔄 **EXIF ओरिएंटेशन फिक्स** — iPhone/Samsung फोटो का रोटेशन ऑटो-फिक्स
- 🖼️ **WebP कंवर्ज़न** — छोटी फ़ाइलों के लिए आधुनिक फॉर्मेट में बदलें
- ⚡ **Web Worker** — बैकग्राउंड थ्रेड में नॉन-ब्लॉकिंग कंप्रेशन
- 📊 **प्रोग्रेस कॉलबैक** — रियल-टाइम कंप्रेशन प्रोग्रेस दिखाएं
- 💧 **वॉटरमार्क** — टेक्स्ट या इमेज वॉटरमार्क जोड़ें
- 📝 **Base64 आउटपुट** — इंस्टेंट प्रीव्यू के लिए Data URL प्राप्त करें

## इंस्टॉल

```bash
npm install @miconvert/browser-image-compression
```

## क्विक स्टार्ट

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // लक्ष्य ≤ 1MB
  maxWidthOrHeight: 1920,    // बड़ा होने पर रीसाइज़
  useWebWorker: true,        // बैकग्राउंड थ्रेड
  onProgress: (p) => console.log(`${p}%`),
});
```

## API विकल्प

| विकल्प             | टाइप       | डिफ़ॉल्ट  | विवरण                                    |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | अधिकतम फ़ाइल साइज़ (MB)                  |
| `maxWidthOrHeight` | `number`   | —         | अधिकतम चौड़ाई या ऊंचाई (px)              |
| `initialQuality`   | `number`   | `1`       | प्रारंभिक क्वालिटी (0–1)                 |
| `fileType`         | `string`   | समान      | आउटपुट MIME टाइप                         |
| `useWebWorker`     | `boolean`  | `true`    | Web Worker में चलाएं                      |
| `onProgress`       | `function` | —         | प्रोग्रेस कॉलबैक `(%) => void`           |
| `outputType`       | `string`   | `'file'`  | `'file'` → File, `'base64'` → Data URL   |
| `exifOrientation`  | `boolean`  | `true`    | EXIF ऑटो-फिक्स                           |
| `watermark`        | `object`   | —         | वॉटरमार्क कॉन्फ़िगरेशन                    |

## ब्राउज़र सपोर्ट

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 सहायता और बग रिपोर्ट

> **यदि आपको कोई बग, समस्या मिलती है या सहायता चाहिए, तो कृपया हमसे संपर्क करें:**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
>
> हम सभी पूछताछ का 24 घंटे में जवाब देते हैं। आप [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues) पर भी issue बना सकते हैं, लेकिन सबसे तेज़ प्रतिक्रिया के लिए, कृपया हमारा संपर्क पेज उपयोग करें।

## लाइसेंस

MIT © [Miconvert](https://miconvert.com?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
