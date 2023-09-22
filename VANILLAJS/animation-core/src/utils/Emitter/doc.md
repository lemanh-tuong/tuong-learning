---
category: Utils
title: Emitter
---

Emitter là một class cung cấp các phương thức để quản lý các sự kiện.

## Ví dụ

```ts
type Events = CreateEvents<{
  foo: (a: number) => void;
  bar: () => void;
}>;

const emitter = new Emitter<Events>();

// Gửi đi 1 dữ liệu với sự kiện foo
emitter.emit('foo', 1);

// Lắng nghe một sự kiện
const id = emitter.on('foo', (a) => {
  console.log(a);
});

// Hủy lắng nghe một sự kiện
emitter.off(id);
```
