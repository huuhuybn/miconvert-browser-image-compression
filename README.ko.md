# @miconvert/browser-image-compression

> 🖼️ 스마트 브라우저 이미지 압축 — 목표 파일 크기를 설정하면 라이브러리가 알아서 처리합니다.

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **다른 언어:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [العربية](./README.ar.md) | [Bahasa Indonesia](./README.id.md) | [ภาษาไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Italiano](./README.it.md) | [Polski](./README.pl.md) | [Nederlands](./README.nl.md) | [Bahasa Melayu](./README.ms.md) | [Українська](./README.uk.md) | [Svenska](./README.sv.md) | [বাংলা](./README.bn.md)

## 기능

- 🎯 **스마트 압축** — 목표 크기(예: 500KB)를 설정하면 최적 품질을 자동으로 탐색
- 📐 **자동 리사이즈** — 최대 너비/높이에 맞춰 종횡비 유지
- 🔄 **EXIF 방향 수정** — iPhone/Samsung 사진의 회전 자동 수정
- 🖼️ **WebP 변환** — 더 작은 파일을 위한 최신 포맷 변환
- ⚡ **Web Worker** — 백그라운드 스레드에서 논블로킹 압축
- 📊 **진행률 콜백** — 실시간 압축 진행률 표시
- 💧 **워터마크** — 텍스트 또는 이미지 워터마크 추가
- 📝 **Base64 출력** — 미리보기용 Data URL 반환

## 설치

```bash
npm install @miconvert/browser-image-compression
```

## 빠른 시작

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // 목표 ≤ 1MB
  maxWidthOrHeight: 1920,    // 초과 시 리사이즈
  useWebWorker: true,        // 백그라운드 처리
  onProgress: (p) => console.log(`${p}%`),
});
```

## API 옵션

| 옵션               | 타입       | 기본값    | 설명                                     |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | 최대 파일 크기 (MB)                      |
| `maxWidthOrHeight` | `number`   | —         | 최대 너비 또는 높이 (px)                 |
| `initialQuality`   | `number`   | `1`       | 초기 품질 (0–1)                          |
| `fileType`         | `string`   | 입력과 동일| 출력 MIME 타입                           |
| `useWebWorker`     | `boolean`  | `true`    | Web Worker에서 실행                      |
| `onProgress`       | `function` | —         | 진행률 콜백 `(%) => void`                |
| `outputType`       | `string`   | `'file'`  | `'file'`은 File, `'base64'`는 Data URL 반환 |
| `exifOrientation`  | `boolean`  | `true`    | EXIF 방향 자동 수정                      |
| `watermark`        | `object`   | —         | 워터마크 설정                            |

## 브라우저 지원

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 지원 및 버그 신고

> **버그, 문제 또는 도움이 필요한 경우 아래로 연락해 주세요:**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
>
> 모든 문의에 24시간 이내 답변드립니다. [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues)에서 이슈를 생성할 수도 있지만, 가장 빠른 응답을 원하시면 문의 페이지를 이용해 주세요.

## 라이선스

MIT © [Miconvert](https://miconvert.com?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
