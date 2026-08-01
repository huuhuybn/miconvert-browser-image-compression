# @miconvert/browser-image-compression

> 🖼️ Akıllı tarayıcı tarafında görüntü sıkıştırma — hedef dosya boyutunu belirleyin, kütüphane gerisini halletsin.

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **Diğer diller:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [العربية](./README.ar.md) | [Bahasa Indonesia](./README.id.md) | [ภาษาไทย](./README.th.md) | [Italiano](./README.it.md) | [Polski](./README.pl.md) | [Nederlands](./README.nl.md) | [Bahasa Melayu](./README.ms.md) | [Українська](./README.uk.md) | [Svenska](./README.sv.md) | [বাংলা](./README.bn.md)

## Özellikler

- 🎯 **Akıllı Sıkıştırma** — Hedef boyut belirleyin (ör. 500KB), kütüphane en iyi kaliteyi otomatik bulur
- 📐 **Otomatik Boyutlandırma** — En fazla genişlik/yüksekliğe göre boyutlandırma, en-boy oranı korunur
- 🔄 **EXIF Düzeltme** — iPhone/Samsung fotoğraflarının döndürülmesini otomatik düzeltir
- 🖼️ **WebP Dönüştürme** — Daha küçük dosyalar için modern formatlara dönüştürme
- ⚡ **Web Worker** — Arka plan iş parçacığında engellemesiz sıkıştırma
- 📊 **İlerleme Geri Çağırma** — Gerçek zamanlı sıkıştırma ilerlemesi
- 💧 **Filigran** — Metin veya görüntü filigranı ekleme
- 📝 **Base64 Çıktı** — Anlık önizleme için Data URL alma

## Kurulum

```bash
npm install @miconvert/browser-image-compression
```

## Hızlı Başlangıç

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // Hedef ≤ 1MB
  maxWidthOrHeight: 1920,    // Büyükse boyutlandır
  useWebWorker: true,        // Arka plan
  onProgress: (p) => console.log(`${p}%`),
});
```

## API Seçenekleri

| Seçenek            | Tip        | Varsayılan | Açıklama                                 |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | Maksimum dosya boyutu (MB)               |
| `maxWidthOrHeight` | `number`   | —         | Maksimum genişlik veya yükseklik (px)    |
| `initialQuality`   | `number`   | `1`       | Başlangıç kalitesi (0–1)                 |
| `fileType`         | `string`   | aynı      | Çıkış MIME tipi                          |
| `useWebWorker`     | `boolean`  | `true`    | Web Worker'da çalıştır                   |
| `onProgress`       | `function` | —         | İlerleme geri çağırma `(%) => void`      |
| `outputType`       | `string`   | `'file'`  | `'file'` → File, `'base64'` → Data URL  |
| `exifOrientation`  | `boolean`  | `true`    | Otomatik EXIF düzeltme                   |
| `watermark`        | `object`   | —         | Filigran yapılandırması                  |

## Tarayıcı Desteği

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 Destek ve Hata Bildirimi

> **Herhangi bir hata, sorun bulursanız veya yardıma ihtiyacınız varsa, lütfen bize ulaşın:**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
>
> Tüm sorulara 24 saat içinde yanıt veriyoruz. [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues)'da da issue açabilirsiniz, ancak en hızlı yanıt için iletişim sayfamızı kullanın.

## Lisans

MIT © [Miconvert](https://miconvert.com?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
