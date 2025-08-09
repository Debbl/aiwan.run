---
title: Responsive image on container
description: Implement a JavaScript solution for responsive images on containers, automatically adjusting image dimensions based on container aspect ratios to maintain optimal display
date: 2024-08-20T12:43:02.068Z
duration: 5min
keywords:
  - responsive image
  - container
  - image
  - aspect ratio
---

# Responsive image on container

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

After the image is loaded, get the aspect ratio of the parent container. If the original width of the image is greater than the original height multiplied by the aspect ratio of the container, set the width of the image to 100%, otherwise set the height of the image to 100%.
