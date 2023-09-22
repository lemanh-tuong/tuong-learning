---
category: Utils
title: createAnimate
---

createAnimate: hàm này được sử dụng để tạo ra một đối tượng animate mới.

## Ví dụ

```ts
const buttonEl = document.querySelector('button');
const animated = createAnimate();

buttonEl.addEventListener('click', () => {
  animated({
    from: 0,
    to: 100,
    duration: 1000,
    onUpdate: (value) => {
      buttonEl.style.width = `${value}px`;
    }
  }
});

// Sử dụng method
animated.onStart((value) => {
  console.log('onStart', value);
});
animated.onUpdate((value) => {
  console.log('onUpdate', value);
});
animated.onEnd((value) => {
  console.log('onEnd', value);
});
```
