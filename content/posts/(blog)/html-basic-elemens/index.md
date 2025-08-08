---
title: HTML Basic Elements
description: Learn about the basic elements of HTML and the basics of web development, including document structure, semantic tags, character encoding, image formats, and other core concepts.
date: 2021-08-30T12:07:54.000Z
duration: 10min
keywords:
  - HTML
  - Basic Elements
  - Web
  - Basic
  - Tags
  - Semantic
  - Pixel
  - URL
  - Character Entity
  - Image Format
  - Pixel
  - URL
  - Character Entity
---

# HTML Basic Elements

> HTML HyperText Marup Language

## HTML Basic Structure

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

### 文档声明

> \<!DOCTYPE html>

> HTML document declaration, tells the browser that the current page is an HTML5 page, and the browser uses the HTML5 standard to parse and recognize the HTML document, omitting may cause browser compatibility issues

## html element

- The html element is the root element of the HTML document, a document can only have one, and all other elements are its descendant elements

- W3C standard suggests adding a `lang` attribute to the html element

  > - `lang=en` , HTML document language is English
  > - `lang=zh-CN` , HTMl document language is Chinese

  - Help translation tools determine the translation rules to use
  - Help speech synthesis tools determine the pronunciation to use

### head element

> The content inside the head element is some **meta data** (data that describes data), generally used to describe various information about the web page, such as **character encoding, web page title, web page icon** etc.

#### title element

> Web page title, displayed in the browser tab

```html
<head>
  <title>Document</title>
</head>
```

#### meta element

- Can be used to set the **character encoding** of the web page, so that the browser can display each character more accurately, not setting or incorrect may cause garbled text
- Generally use `UTF-8` encoding, including all characters in the world

```html
<head>
  <meta charset="UTF-8" />
</head>
```

> Some common elements inside the head

- meta
- title
- style
- link
- base
- script
- nosctipt

```html
<head>
  <meta charset="UTF-8" />
  <title>Document</title>
  <link rel="stylesheet" href="./index.css" />
  <style>
    div {
      color: red;
    }
  </style>
  <script src="./index.js"></script>
  <noscript>Your browser does not support JavaScript </noscript>
  <base href="https://blog.aiwan.run" target="_self" />
</head>
```

### body element

> The content inside the body element is the content that is displayed in the browser

#### h

> Title, there are six levels of titles from h1 to h6

```html
<body>
  <h1>First level title</h1>
  <h2>Second level title</h2>
  <h3>Third level title</h3>
</body>
```

#### p

> paragreph

> A paragraph in an article

```html
<body>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
</body>
```

#### strong

> Used to emphasize some text, the effect of bolding

```html
<body>
  <p><strong>ipsum</strong> dolor sit amet consectetur adipisicing elit.</p>
</body>
```

#### code

> Used to display program code

```html
<body>
  <code> print("Hello World!") </code>
</body>
```

#### br

> Single tag, force line break

#### hr

> Single tag, line break

#### span

> By default, it is almost no different from normal text, it is used to distinguish special text and normal text, such as displaying some keywords

#### div

Generally used as a parent container for other elements, wrapping other elements, representing a whole, used to divide the webpage into multiple independent parts

#### img

> img element is used to display **images**, img is the abbreviation of **image**

```html
<body>
  <img src="../img/picture.jpg" alt="" width="100px" />
</body>
```

- src attribute is short for **source**, used to set the image URL, can be **local images** or **web images**
- Absolute path
- Relative path

  > . represents the current path, .. represents the previous level path.

- alt is a necessary attribute of the img element, indicating that when the image is not loaded, the text is displayed as a substitute

- width (height) if only width (height) is set, the browser will automatically calculate the height (width) based on the image width and height

#### a

> Hyperlink, to other web pages, files, positions within the same page, email addresses or any other URL

```html
<body>
  <a href="https://blog.aiwan.run/" target="_self">My blog</a>
</body>
```

- href (hypertext reference) specifies the URL to open,
- target where to open the URL
  - \_self (default value): self
  - \_blank : open in a new browser blank page
  - \_parent : open in the parent level, must be used with iframe
  - \_top : open in the top level, must be used with iframe
  - The name value of a frame, open in a frame

> Anchor link, to jump to the specific position of the current document

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <p id="one">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, velit
      neque. Numquam, fuga? Consequuntur beatae pariatur velit commodi, omnis
      reprehenderit voluptas recusandae maiores, eveniet nostrum et accusamus
      nesciunt, officia iusto!
    </p>

    <a href="#one">To p element</a>
  </body>
</html>
```

> Pseudo link, we hope that when we click, the URL is not opened, but some other things are triggered

> Sometimes we hope that when we click, the URL is not opened, but some other things are triggered

```html
<body>
  <a href="javascript: alert('Hello world!')">Alert</a>
  <a href="" onclick="alert('Hello world!')">Alert</a>
</body>
```

#### iframe

> Using the iframe element can achieve, embedding other HTML documents in an HTMl document

```html
<body>
  <iframe
    src="./index.html"
    frameborder="0"
    width="1000px"
    height="600px"
  ></iframe>
</body>
```

- frameborder indicates whether to display the border `1` display `0` do not display

#### base

> The base element is written in the head element, specifying the root URL for all relative URLs contained in a document. A document can only have one \<base> element.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <base href="https://gitee.com" target="_self" />
  </head>
  <body>
    <a href="/Debbl/hexo-blog-imges/raw/master/images/favicon.png">logo</a>
    <img
      src="/Debbl/hexo-blog-imges/raw/master/images/favicon.png"
      alt="logo"
    />
  </body>
</html>
```

## Some supplements

### h element and SEO

> h element helps to optimize the SEO (Search Engine Optimization) of the website, promoting keyword rankings

- It is recommended that a web page has **one** h1 element
- h element can represent the weight of some keywords

### Character Entity

> Because some characters in HTMl have special purposes (reserved characters) such as `<` , `>`, when we want to display these characters, we need to use character entities

https://www.w3school.com.cn/html/html_entities.asp

> Entity name is case-sensitive

| Display result | Description           | Entity name          | Entity number |
| :------- | :---------------- | :----------------- | :------- |
|          | 空格              | \&nbsp;            | \&#160;  |
| \<       | 小于号            | \&lt;              | \&#60;   |
| >        | 大于号            | \&gt;              | \&#62;   |
| &        | 和号              | \&amp;             | \&#38;   |
| "        | 引号              | \&quot;            | \&#34;   |
| '        | 撇号              | \&apos; (IE不支持) | \&#39;   |
| ￠       | 分（cent）        | \&cent;            | \&#162;  |
| £        | 镑（pound）       | \&pound;           | \&#163;  |
| ¥        | 元（yen）         | \&yen;             | \&#165;  |
| €        | 欧元（euro）      | \&euro;            | \&#8364; |
| §        | 小节              | \&sect;            | \&#167;  |
| ©       | 版权（copyright） | \&copy;            | \&#169;  |
| ®       | 注册商标          | \&reg;             | \&#174;  |
| ™       | 商标              | \&trade;           | \&#8482; |
| ×        | 乘号              | \&times;           | \&#215;  |
| ÷        | 除号              | \&divide;          | \&#247;  |

### Common image formats

- png static image, supports transparency
- jpg static image, does not support transparency
- gif dynamic image, static image, supports transparency

### Pixel

> Pixel px (pixel) is the smallest unit of image display, each pixel displays one color

### URl format

```
protocol://hostname[:port]/path/[;parameters][?query]#fragment
```

### Semantic tags

> In HTML, we can use other tags to implement the functionality of another tag, but we should尽量使用标签本来的意思,便于开发和维护等等
