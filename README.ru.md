# @miconvert/browser-image-compression

> 🖼️ Умное сжатие изображений в браузере — задайте целевой размер файла, а библиотека сделает всё остальное.

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **На других языках:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [العربية](./README.ar.md) | [Bahasa Indonesia](./README.id.md) | [ภาษาไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Italiano](./README.it.md) | [Polski](./README.pl.md) | [Nederlands](./README.nl.md) | [Bahasa Melayu](./README.ms.md) | [Українська](./README.uk.md) | [Svenska](./README.sv.md) | [বাংলা](./README.bn.md)

## Возможности

- 🎯 **Умное сжатие** — Задайте целевой размер (напр. 500КБ), библиотека автоматически найдёт оптимальное качество
- 📐 **Автоматическое масштабирование** — Масштабирование до максимальной ширины/высоты с сохранением пропорций
- 🔄 **Исправление EXIF** — Автоматическое исправление повёрнутых фото с iPhone/Samsung
- 🖼️ **Конвертация в WebP** — Преобразование в современные форматы для меньших файлов
- ⚡ **Web Worker** — Неблокирующее сжатие в фоновом потоке
- 📊 **Callback прогресса** — Отображение прогресса сжатия в реальном времени
- 💧 **Водяной знак** — Добавление текстовых или графических водяных знаков
- 📝 **Вывод Base64** — Получение Data URL для мгновенного превью

## Установка

```bash
npm install @miconvert/browser-image-compression
```

## Быстрый старт

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // Цель ≤ 1МБ
  maxWidthOrHeight: 1920,    // Масштабировать если больше
  useWebWorker: true,        // Фоновый поток
  onProgress: (p) => console.log(`${p}%`),
});
```

## Параметры API

| Параметр           | Тип        | По умолч. | Описание                                 |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | Максимальный размер файла (МБ)           |
| `maxWidthOrHeight` | `number`   | —         | Максимальная ширина или высота (px)      |
| `initialQuality`   | `number`   | `1`       | Начальное качество (0–1)                 |
| `fileType`         | `string`   | как вход  | Выходной MIME-тип                        |
| `useWebWorker`     | `boolean`  | `true`    | Выполнять в Web Worker                   |
| `onProgress`       | `function` | —         | Callback прогресса `(%) => void`         |
| `outputType`       | `string`   | `'file'`  | `'file'` → File, `'base64'` → Data URL  |
| `exifOrientation`  | `boolean`  | `true`    | Автокоррекция EXIF-ориентации            |
| `watermark`        | `object`   | —         | Настройки водяного знака                 |

## Поддержка браузеров

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 Поддержка и сообщения об ошибках

> **Если вы столкнулись с багами, проблемами или вам нужна помощь, свяжитесь с нами:**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
>
> Мы отвечаем на все запросы в течение 24 часов. Вы также можете создать issue на [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues), но для самого быстрого ответа используйте нашу страницу контактов.

## Лицензия

MIT © [Miconvert](https://miconvert.com?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
