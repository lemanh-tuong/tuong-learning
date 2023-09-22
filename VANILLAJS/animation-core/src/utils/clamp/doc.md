---
category: Utils
title: clamp
---

Giới hạn giá trị nằm trong đoạn min tới max

## Ví dụ

```ts
import { clamp } from '@xo/utils';
const el = document.querySelector('button');

let count = 0;
el.addEventListener('click', () => {
  count++;
  const newCount = clamp(count, 0, 20);
  console.log(newCount); // Giá trị newCount luôn nằm trong đoạn 0 đến 20
})
```
