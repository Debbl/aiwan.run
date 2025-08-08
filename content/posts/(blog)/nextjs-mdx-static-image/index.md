---
title: Use MDX Static Images in Next.js
description: Solve the problem of static image processing in Next.js MDX, and implement automatic import and optimization display of relative path images through a custom remark plugin.
date: 2025-02-10T02:20:14.179Z
duration: 5min
keywords:
  - Next.js
  - MDX
  - remark-static-image
  - markdown
  - Static Image
  - Static Site
---

If you follow the official documentation of Next.js to integrate [MDX](https://nextjs.org/docs/pages/building-your-application/configuring/mdx), it is not possible to handle static image resources in md documents, the common solution is to put all image resources into the `public` directory, and then use them in the md document, but this has a drawback that it is not possible to preview images when editing md documents locally. Is it possible to let Next.js find the image resources with the correct relative path?

The current solution is to refer to the implementation of [nextra](https://github.com/shuding/nextra), use the mdx format to parse the md file, and then convert the image resources into `import` statements, and finally use the `<Image />` component to display the image.

```md
![](./images/image.png)
```

```tsx
import __image_0 from './images/image.png'

function Page() {
  return <Image src={__image_0} alt='image' />
}
```

Because all md files can be parsed as components here, so there is no need to worry about the relative path of `./images/image.png` here.

The specific implementation of the plugin can be viewed at https://github.com/Debbl/aiwan.run/blob/main/packages/remark-plugins/src/remark-static-image.ts.
