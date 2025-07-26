---
title: HTML 基本元素
description: HTML 的基本元素和一些 Web 基础
date: 2021-08-30T12:07:54.000Z
duration: 10min
keywords:
  - HTML
  - 基本元素
  - Web
  - 基础
  - 标签
  - 语义化
  - 像素
  - URL
  - 字符实体
  - 图片格式
  - 像素
  - URL
  - 字符实体
---

# HTML基本元素

> HTML 超文本标记语言 HyperText Marup Language

## HTML 基本的结构

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

HTML 文档声明，告诉浏览器当前页面是 HTML5 页面，让浏览器用 HTML5 的标准去解析和识别 HTML 文档，省略可能会出现浏览器兼容问题

## html 元素

- html 元素是 HTML 文档的根元素，一个文档只能有一个，其他所有元素是其后代元素

- W3C 标准建议为为 html 元素增加一个 `lang` 属性

  > - `lang=en` ，HTML 文档语言是英文
  > - `lang=zh-CN` ，HTMl 文档语言是中文

  - 帮助翻译工具确定要是使用的翻译规则
  - 帮助语音合成工具确定使用的发音

### head 元素

head 元素里面的内容是一些**元数据**（描述数据的数据），一般用于描述网页的各种信息，比如**字符编码、网页标题、网页图标** 等

#### title 元素

> 网页标题，显示在浏览器标签页上

```html
<head>
  <title>Document</title>
</head>
```

#### meta 元素

- 可以用于设置网页的**字符编码**，让浏览器更精准地显示每一个文字，不设置或错误可能会导致文字乱码
- 一般都使用 `UTF-8` 编码，包含世界上所有文字

```html
<head>
  <meta charset="UTF-8" />
</head>
```

head 内的一些常用元素

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
  <noscript>你的浏览器不支持 JavaScript </noscript>
  <base href="https://blog.aiwan.run" target="_self" />
</head>
```

### body 元素

body 元素里面的内容是具体显示在浏览器的内容和结构

#### h

表示标题，有h1~h6共六级标题

```html
<body>
  <h1>一级标题</h1>
  <h2>二级标题</h2>
  <h3>三级标题</h3>
</body>
```

#### p

> paragreph

表示文章中的一个段落

```html
<body>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
</body>
```

#### strong

用于强调某些文本，加粗的效果

```html
<body>
  <p><strong>ipsum</strong> dolor sit amet consectetur adipisicing elit.</p>
</body>
```

#### code

用于显示程序代码

```html
<body>
  <code> print("Hello World!") </code>
</body>
```

#### br

单标签，强制换行

#### hr

单标签，分割线

#### span

默认情况下，跟普通文本几乎没差别，其用于区分特殊文本和普通文本，比如用来显示一些关键字

#### div

一般作为其他元素的父容器，把其他元素包住，代表一个整体，用于把网页分割为多个独立的部分

#### img

img 元素专门用来显示**图片**，img 是 **image** 的缩写

```html
<body>
  <img src="../img/picture.jpg" alt="" width="100px" />
</body>
```

- src 属性 **source** 的缩写，用来设置图片的 URL ，可以是**本地图片**和**网图**

  - 绝对路径
  - 相对路径

  > . 代表当前路径，.. 代表上一级路径

- alt 是 img 元素的必要属性，表示没有加载图片是**替代**显示文本

- width (height) 如果只设置了 width (height) ，浏览器会自动根据图片的宽高计算出 height (width)

#### a

定义超链接，到其他网页、文件、同一页面内的位置、电子邮件地址或任何其他 URL 的超链接

```html
<body>
  <a href="https://blog.aiwan.run/" target="_self">My blog</a>
</body>
```

- href （hypertext reference） 指定要打开的 URL，
- target 在哪里打开 URL
  - \_self（默认值）：自己
  - \_blank : 在新的浏览器空白页打开
  - \_parent : 在父级打开，要和 iframe 一起使用
  - \_top : 在顶层打开，要和 iframe 一起使用
  - 某个 frame 的 name 值，在某个 frame 中打开

> 锚点链接，实现跳转的当前文档的具体位置

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

    <a href="#one">到 p 元素</a>
  </body>
</html>
```

> 伪链接

有时候我们希望点击时不打开 URL，而是触发一些其他的东西

```html
<body>
  <a href="javascript: alert('Hello world!')">弹窗</a>
  <a href="" onclick="alert('Hello world!')">弹窗</a>
</body>
```

#### iframe

利用 iframe 元素可以实现，在一个 HTMl 文档中嵌入其他 HTML 文档

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

- frameborder 表示是否显示边框 `1` 显示 `0` 不显示

#### base

base 元素写在 head 元素中，指定用于一个文档中包含的所有相对 URL 的根 URL。一份中只能有一个 \<base> 元素。

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

## 一些补充

### h 元素和 SEO

h 元素有助于网站的 SEO （Search Engine Optimization）优化，促进关键词排名

- 建议一个网页最多有**一个**h1元素
- h 元素的可以表示一些关键词的权重

### 字符实体（Character Entity）

因为 HTMl 中的一些字符有特殊用途（预留字符）如 `<` 、`>` ，当我们想要显示这些字符时就需要使用字符实体

https://www.w3school.com.cn/html/html_entities.asp

> 实体名称对大小写敏感

| 显示结果 | 描述              | 实体名称           | 实体编号 |
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

### 常用的图片格式

- png 静态图片，支持透明
- jpg 静态图片，不支持透明
- gif 动态图片、静态图片，支持透明

### 像素

像素 px （pixel）图像显示的最小单位，每个像素显示一种颜色

### URl 格式

```
protocol://hostname[:port]/path/[;parameters][?query]#fragment
```

### 标签语义化

在 HTML 我们可以使别的标签来实现另一个标签的功能，但我们应尽量使用标签本来的意思，便于开发和维护等等
