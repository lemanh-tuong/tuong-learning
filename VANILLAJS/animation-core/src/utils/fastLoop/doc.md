---
category: Utils
title: fastLoop
---

Lặp qua các phần tử nhanh hơn

## Ví dụ

```ts
const arr = [1, 2, 3];

each(arr, item => {
  console.log(item); // 1, 2, 3
});

const arrFilter = filter(arr, item => item === 1); // [1]

const arrMap = map(arr, item => item + 10); // 11, 12, 13

const arrReduce = reduce(arr, (acc, item) => acc + item, 0); // 6

const index = findIndex(arr, item => item === 2); // 1
```
