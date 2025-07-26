---
title: vscode custom ui
description: Learn how to customize VSCode UI using the Custom UI Style extension, including CSS styling for various VSCode components and widgets
date: 2025-07-21T12:25:09.320Z
duration: 3min
keywords:
  - vscode
  - custom ui
  - vscode custom ui
---

a vscode extension to customize the vscode ui

- [Custom UI Style](https://marketplace.visualstudio.com/items?itemName=subframe7536.custom-ui-style)

like this you can customize the vscode quick input widget position

```json title="settings.json"
{
  "custom-ui-style.stylesheet": {
    ".quick-input-widget": "top: 25vh !important"
  }
}
```

![vscode-custom-ui](./images/vscode-custom-ui.png)
