# @miconvert/browser-image-compression

> 🖼️ Розумне стиснення зображень у браузері — задайте цільовий розмір файлу, бібліотека зробить все інше.

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **Інші мови:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [العربية](./README.ar.md) | [Bahasa Indonesia](./README.id.md) | [ภาษาไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Italiano](./README.it.md) | [Polski](./README.pl.md) | [Nederlands](./README.nl.md) | [Bahasa Melayu](./README.ms.md) | [Svenska](./README.sv.md) | [বাংলা](./README.bn.md)

## Можливості

- 🎯 **Розумне стиснення** — Задайте цільовий розмір (напр. 500КБ), бібліотека автоматично знайде оптимальну якість
- 📐 **Автоматичне масштабування** — Масштабування до максимальної ширини/висоти зі збереженням пропорцій
- 🔄 **Виправлення EXIF** — Автоматичне виправлення повернутих фото з iPhone/Samsung
- 🖼️ **Конвертація у WebP** — Перетворення в сучасні формати для менших файлів
- ⚡ **Web Worker** — Неблокуюче стиснення у фоновому потоці
- 📊 **Callback прогресу** — Відображення прогресу стиснення в реальному часі
- 💧 **Водяний знак** — Додавання текстових або графічних водяних знаків
- 📝 **Вивід Base64** — Отримання Data URL для миттєвого перегляду

## Встановлення

```bash
npm install @miconvert/browser-image-compression
```

## Швидкий старт

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // Ціль ≤ 1МБ
  maxWidthOrHeight: 1920,    // Масштабувати якщо більше
  useWebWorker: true,        // Фоновий потік
  onProgress: (p) => console.log(`${p}%`),
});
```

## Параметри API

| Параметр           | Тип        | За замовч. | Опис                                     |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | Максимальний розмір файлу (МБ)           |
| `maxWidthOrHeight` | `number`   | —         | Максимальна ширина або висота (px)       |
| `initialQuality`   | `number`   | `1`       | Початкова якість (0–1)                   |
| `fileType`         | `string`   | як вхід   | Вихідний MIME-тип                        |
| `useWebWorker`     | `boolean`  | `true`    | Виконувати у Web Worker                  |
| `onProgress`       | `function` | —         | Callback прогресу `(%) => void`          |
| `outputType`       | `string`   | `'file'`  | `'file'` → File, `'base64'` → Data URL  |
| `exifOrientation`  | `boolean`  | `true`    | Автокорекція EXIF-орієнтації             |
| `watermark`        | `object`   | —         | Налаштування водяного знаку              |

## Підтримка браузерів

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 Підтримка та повідомлення про помилки

> **Якщо ви зіткнулися з багами, проблемами або вам потрібна допомога, зв'яжіться з нами:**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
>
> Ми відповідаємо на всі запити протягом 24 годин. Ви також можете створити issue на [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues), але для найшвидшої відповіді використовуйте нашу сторінку контактів.

## Ліцензія

MIT © [Miconvert](https://miconvert.com?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
