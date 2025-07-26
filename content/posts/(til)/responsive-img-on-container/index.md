---
title: 容器内响应式图片
date: 2024-08-20T12:43:02.068Z
duration: 5min
keywords:
  - 响应式图片
  - 容器
  - 图片
  - 宽高比
  - 响应式
  - 响应式图片
---

# 容器内响应式图片

```html
<style>
  .container {
    width: 100px;
  }
</style>
<div class="container">
  <img src="https://avatars.githubusercontent.com/u/61053131" alt="" />
</div>
<script>
  const img = document.querySelector('img')

  img.addEventListener('load', (e) => {
    const img = e.target
    const parent = img.parentElement
    const scale = parent.clientWidth / parent.clientHeight

    if (img.complete) {
      if (img.naturalWidth > img.naturalHeight * scale) {
        img.style.width = '100%'
        img.style.height = 'auto'
      } else {
        img.style.width = 'auto'
        img.style.height = '100%'
      }
    }
  })
</script>
```

在图片加载完成后，获取父容器的宽高比，如果图片的原始宽度大于其原始高度乘以容器的宽高比，则设置图片的宽度为 100%否则设置图片的高度为 100%。
