# @miconvert/browser-image-compression

> 🖼️ Nén ảnh thông minh ngay trên trình duyệt — chỉ cần đặt dung lượng mục tiêu, thư viện tự làm phần còn lại.

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **README ngôn ngữ khác:**
[English](./README.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md)

## Tính năng

- 🎯 **Nén thông minh** — Đặt dung lượng mục tiêu (vd: 500KB), thư viện tự tìm chất lượng tối ưu
- 📐 **Tự động resize** — Thu nhỏ theo chiều rộng/cao tối đa, giữ nguyên tỉ lệ
- 🔄 **Sửa EXIF** — Tự động sửa ảnh xoay từ iPhone/Samsung
- 🖼️ **Chuyển đổi WebP** — Chuyển sang định dạng hiện đại, nhỏ hơn
- ⚡ **Web Worker** — Nén trên luồng nền, không block UI
- 📊 **Callback tiến trình** — Hiển thị % nén theo thời gian thực
- 💧 **Watermark** — Thêm chữ hoặc logo watermark lên ảnh
- 📝 **Xuất Base64** — Lấy Data URL để hiển thị preview ngay

## Cài đặt

```bash
npm install @miconvert/browser-image-compression
```

## Bắt đầu nhanh

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // Mục tiêu ≤ 1MB
  maxWidthOrHeight: 1920,    // Resize nếu lớn hơn
  useWebWorker: true,        // Chạy nền
  onProgress: (p) => console.log(`${p}%`),
});
```

## Đầy đủ tùy chọn

```typescript
const result = await imageCompression(file, {
  maxSizeMB: 0.5,              // Dung lượng mục tiêu (MB)
  maxWidthOrHeight: 1920,      // Chiều rộng/cao tối đa (px)
  initialQuality: 1,           // Chất lượng ban đầu (0–1)
  fileType: 'image/webp',      // Định dạng đầu ra
  useWebWorker: true,          // Dùng Web Worker (mặc định: true)
  exifOrientation: true,       // Sửa xoay EXIF (mặc định: true)
  outputType: 'base64',        // 'file' hoặc 'base64'
  onProgress: (p) => {},       // Callback tiến trình (0–100)
  watermark: {                 // Watermark tùy chọn
    text: '© Thương hiệu',
    position: 'bottom-right',
    opacity: 0.3,
    fontSize: 24,
    fontColor: '#ffffff',
    margin: 16,
  },
});
```

## Bảng tùy chọn API

| Tùy chọn           | Kiểu       | Mặc định  | Mô tả                                   |
|---------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`         | `number`   | —         | Dung lượng tối đa (MB)                  |
| `maxWidthOrHeight`  | `number`   | —         | Chiều rộng/cao tối đa (px)              |
| `initialQuality`    | `number`   | `1`       | Chất lượng ban đầu (0–1)                |
| `fileType`          | `string`   | giữ nguyên| MIME type đầu ra (`image/webp`, ...)     |
| `useWebWorker`      | `boolean`  | `true`    | Chạy trong Web Worker                    |
| `onProgress`        | `function` | —         | Callback tiến trình `(%) => void`        |
| `outputType`        | `string`   | `'file'`  | `'file'` trả File, `'base64'` trả Data URL |
| `exifOrientation`   | `boolean`  | `true`    | Tự động sửa EXIF                        |
| `watermark`         | `object`   | —         | Cấu hình watermark (xem trên)           |

## Trình duyệt hỗ trợ

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 Hỗ trợ & Báo lỗi

> **Nếu bạn gặp bất kỳ lỗi, sự cố, hoặc cần hỗ trợ, vui lòng liên hệ chúng tôi tại:**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact)
>
> Chúng tôi phản hồi tất cả yêu cầu trong vòng 24 giờ. Bạn cũng có thể tạo issue trên [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues), nhưng để được phản hồi nhanh nhất, vui lòng sử dụng trang liên hệ.

## Giấy phép

MIT © [Miconvert](https://miconvert.com)
