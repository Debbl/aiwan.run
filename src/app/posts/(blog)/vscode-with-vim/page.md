---
title: VSCode With Vim
date: 2025-03-11T08:48:38.061Z
duration: 10min
---

# VSCode 中使用 Vim

> 官方文档
> https://github.com/VSCodeVim/Vim

> VSCode when 条件
> https://code.visualstudio.com/api/references/when-clause-contexts

> VSCode 默认快捷键
> https://code.visualstudio.com/docs/reference/default-keybindings

## 安装

```
vscodevim.vim
```

对于 Mac 用户，如果要启用全局按键重复

```sh
defaults write -g ApplePressAndHoldEnabled -bool false
```

## 配置

> VSCode 默认快捷键命令 https://code.visualstudio.com/docs/reference/default-keybindings

### `x` 删除不保存到寄存器

> https://harttle.land/2016/07/25/vim-registers.html

```json
"vim.normalModeKeyBindingsNonRecursive": [
  {
    "before": ["x"],
    "after": ["\"", "_", "x"],
    "silent": true
  },
]
```

### 跳转到问题提示

```json
"vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": ["g", "["],
      "commands": ["editor.action.marker.prevInFiles"]
    },
    {
      "before": ["g", "]"],
      "commands": ["editor.action.marker.nextInFiles"]
    },
]
```

### 保存文件

```json
"vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": ["leader", "w"],
      "commands": ["workbench.action.files.save"]
    },
]
```

### 一些操作

`m` + 字母 设置 mark

`'` + 字母 跳转到 mark

## 非 Vim 模式下键盘操作

### 移动选择文件

`j` `k` 移动选择文件, `l` `o` 展开文件夹或打开文件

### keybindings

> https://code.visualstudio.com/docs/configure/keybindings#_keyboard-rules

```json
[
  {
    "key": "cmd+l cmd+o",
    "command": "-extension.liveServer.goOnline",
    "when": "editorTextFocus"
  },
  {
    "key": "cmd+l cmd+c",
    "command": "-extension.liveServer.goOffline",
    "when": "editorTextFocus"
  },

  // 移动到下一个建议
  {
    "key": "ctrl+j",
    "command": "selectNextSuggestion",
    "when": "suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus"
  },
  // 移动到上一个建议
  {
    "key": "ctrl+k",
    "command": "selectPrevSuggestion",
    "when": "suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus"
  },

  // quickOpen
  {
    "key": "alt+j",
    "command": "workbench.action.quickOpenSelectNext",
    "when": "inputFocus && !editorFocus && !findInputFocussed && !findWidgetVisible"
  },
  {
    "key": "alt+k",
    "command": "workbench.action.quickOpenSelectPrevious",
    "when": "inputFocus && !editorFocus && !findInputFocussed && !findWidgetVisible"
  },

  // terminal
  {
    "key": "alt+j",
    "command": "workbench.action.terminal.toggleTerminal",
    "when": "terminalFocus"
  },

  // 将光标向上动1屏
  {
    "key": "ctrl+k",
    "command": "workbench.action.focusAboveGroup",
    "when": "inputFocus && vim.mode == 'Normal'"
  },
  // 将光标向下动1屏
  {
    "key": "ctrl+j",
    "command": "workbench.action.focusBelowGroup",
    "when": "inputFocus && vim.mode == 'Normal'"
  },
  // 将光标向左移动1屏
  {
    "key": "ctrl+h",
    "command": "workbench.action.focusLeftGroup",
    "when": "inputFocus && vim.mode == 'Normal'"
  },
  // 将光标向右移动1屏
  {
    "key": "ctrl+l",
    "command": "workbench.action.focusRightGroup",
    "when": "inputFocus && vim.mode == 'Normal'"
  },

  // 新建文件
  {
    "key": "a",
    "command": "explorer.newFile",
    "when": " explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus "
  },
  // 新建目录
  {
    "key": "shift+a",
    "command": "explorer.newFolder",
    "when": " explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus "
  },
  // 刷新资源管理器
  {
    "key": "r",
    "command": "workbench.files.action.refreshFilesExplorer",
    "when": " explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus "
  },
  // 重命名文件或目录
  {
    "key": "r",
    "command": "renameFile",
    "when": " explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus "
  },
  // 删除文件或目录
  {
    "key": "d",
    "command": "deleteFile",
    "when": " explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus "
  },
  // 剪切文件或目录
  {
    "key": "x",
    "command": "filesExplorer.cut",
    "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus"
  },
  // 复制文件或目录
  {
    "key": "y",
    "command": "filesExplorer.copy",
    "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !inputFocus"
  },
  // 粘贴文件或目录
  {
    "key": "p",
    "command": "filesExplorer.paste",
    "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceReadonly && !inputFocus"
  }
]
```
