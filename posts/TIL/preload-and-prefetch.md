---
title: preload and prefetch
description: difference between preload and prefetch
date: "Sun, 26 Nov 2023 08:51:11 GMT"
---

## preload

`<link rel="preload">` is used to preload resources that are needed for `the current page`, and it is loaded before the browser parses the HTML document.

```html
<link rel="preload" href="https://example.com/image.png" as="image" />
```

## prefetch

`<link rel="prefetch">` is used to prefetch resources that will be needed for `the future pages`, and it is loaded after the browser parses the HTML document.

```html
<link rel="prefetch" href="https://example.com/image.png" as="image" />
```

## preload vs prefetch

- preload is used to load resources that are needed for the current page, and it is loaded before the browser parses the HTML document.
- prefetch is used to load resources that will be needed for future pages, and it is loaded after the browser parses the HTML document.
- preload priority is higher than prefetch

## reference

- [https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload)
- [https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/prefetch](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/prefetch)
