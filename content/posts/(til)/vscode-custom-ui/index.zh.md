---
title: 自定义 VSCode 界面
date: 2025-07-21T12:25:09.320Z
duration: 3min
keywords:
  - vscode
  - custom ui
  - vscode 自定义界面
  - vscode 自定义界面样式
---

一个可以自定义 VSCode 界面的插件，可以让你自定义 VSCode 的界面

- [Custom UI Style](https://marketplace.visualstudio.com/items?itemName=subframe7536.custom-ui-style)

例如你可以将快速输入框移动到屏幕的中间位置

```json title="settings.json"
{
  "custom-ui-style.stylesheet": {
    ".quick-input-widget": "top: 25vh !important"
  }
}
```

![vscode-custom-ui](./images/vscode-custom-ui.png)
