# @miconvert/browser-image-compression

> 🖼️ การบีบอัดรูปภาพอัจฉริยะในเบราว์เซอร์ — กำหนดขนาดไฟล์เป้าหมาย แล้วไลบรารีจัดการส่วนที่เหลือ

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **ภาษาอื่น:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [العربية](./README.ar.md) | [Bahasa Indonesia](./README.id.md) | [Türkçe](./README.tr.md) | [Italiano](./README.it.md) | [Polski](./README.pl.md) | [Nederlands](./README.nl.md) | [Bahasa Melayu](./README.ms.md) | [Українська](./README.uk.md) | [Svenska](./README.sv.md) | [বাংলা](./README.bn.md)

## คุณสมบัติ

- 🎯 **บีบอัดอัจฉริยะ** — กำหนดขนาดเป้าหมาย (เช่น 500KB) ไลบรารีหาคุณภาพที่ดีที่สุดอัตโนมัติ
- 📐 **ปรับขนาดอัตโนมัติ** — ปรับขนาดให้พอดีความกว้าง/สูงสูงสุด รักษาอัตราส่วนภาพ
- 🔄 **แก้ไข EXIF** — แก้ไขรูปหมุนจาก iPhone/Samsung อัตโนมัติ
- 🖼️ **แปลง WebP** — แปลงเป็นรูปแบบทันสมัยเพื่อไฟล์ที่เล็กลง
- ⚡ **Web Worker** — บีบอัดแบบไม่บล็อกใน Thread พื้นหลัง
- 📊 **Callback ความคืบหน้า** — แสดงความคืบหน้าการบีบอัดแบบเรียลไทม์
- 💧 **ลายน้ำ** — เพิ่มลายน้ำข้อความหรือรูปภาพ
- 📝 **ส่งออก Base64** — รับ Data URL สำหรับพรีวิวทันที

## ติดตั้ง

```bash
npm install @miconvert/browser-image-compression
```

## เริ่มต้นอย่างรวดเร็ว

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // เป้าหมาย ≤ 1MB
  maxWidthOrHeight: 1920,    // ปรับขนาดถ้าใหญ่กว่า
  useWebWorker: true,        // Thread พื้นหลัง
  onProgress: (p) => console.log(`${p}%`),
});
```

## ตัวเลือก API

| ตัวเลือก           | ชนิด       | ค่าเริ่มต้น | คำอธิบาย                                 |
|--------------------|------------|-------------|------------------------------------------|
| `maxSizeMB`        | `number`   | —           | ขนาดไฟล์สูงสุด (MB)                     |
| `maxWidthOrHeight` | `number`   | —           | ความกว้างหรือสูงสูงสุด (px)              |
| `initialQuality`   | `number`   | `1`         | คุณภาพเริ่มต้น (0–1)                    |
| `fileType`         | `string`   | เหมือนเดิม  | ประเภท MIME ขาออก                        |
| `useWebWorker`     | `boolean`  | `true`      | ทำงานใน Web Worker                       |
| `onProgress`       | `function` | —           | Callback ความคืบหน้า `(%) => void`       |
| `outputType`       | `string`   | `'file'`    | `'file'` → File, `'base64'` → Data URL  |
| `exifOrientation`  | `boolean`  | `true`      | แก้ไข EXIF อัตโนมัติ                     |
| `watermark`        | `object`   | —           | การตั้งค่าลายน้ำ                          |

## รองรับเบราว์เซอร์

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 ช่วยเหลือและรายงานบัก

> **หากคุณพบบัก ปัญหา หรือต้องการความช่วยเหลือ กรุณาติดต่อเราที่:**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
>
> เราตอบกลับทุกคำถามภายใน 24 ชั่วโมง คุณยังสามารถสร้าง issue บน [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues) ได้ แต่สำหรับการตอบกลับที่เร็วที่สุด กรุณาใช้หน้าติดต่อของเรา

## ใบอนุญาต

MIT © [Miconvert](https://miconvert.com?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
