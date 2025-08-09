---
title: VSCode with Vim
description: Integrate Vim editor in VSCode to improve development efficiency, including plugin installation, shortcut configuration, custom settings, and best practices.
date: 2025-03-11T08:48:38.061Z
duration: 10min
keywords:
  - VSCode
  - Vim
  - Shortcut
  - extension
---

# VSCode With Vim

> Official documentation
> https://github.com/VSCodeVim/Vim

> VSCode when conditions
> https://code.visualstudio.com/api/references/when-clause-contexts

> VSCode default shortcut keys
> https://code.visualstudio.com/docs/reference/default-keybindings

## Install

```
vscodevim.vim
```

For Mac users, if you want to enable global key repeat, you need to run the following command

```sh
defaults write -g ApplePressAndHoldEnabled -bool false
```

## Configuration

> VSCode default shortcut key commands https://code.visualstudio.com/docs/reference/default-keybindings

### `x` delete without saving to register

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

### Jump to problem prompt

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

### Save file

```json
"vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": ["leader", "w"],
      "commands": ["workbench.action.files.save"]
    },
]
```

### Some operations

`m` + letter set mark

`'` + letter jump to mark

## Keyboard operations in non-Vim mode

### Move to select file

`j` `k` move to select file, `l` `o` expand folder or open file

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

  // Move to next suggestion
  {
    "key": "ctrl+j",
    "command": "selectNextSuggestion",
    "when": "suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus"
  },
  // Move to previous suggestion
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

  // Move the cursor up 1 screen
  {
    "key": "ctrl+k",
    "command": "workbench.action.focusAboveGroup",
    "when": "inputFocus && vim.mode == 'Normal'"
  },
  // Move the cursor down 1 screen
  {
    "key": "ctrl+j",
    "command": "workbench.action.focusBelowGroup",
    "when": "inputFocus && vim.mode == 'Normal'"
  },
  // Move the cursor left 1 screen
  {
    "key": "ctrl+h",
    "command": "workbench.action.focusLeftGroup",
    "when": "inputFocus && vim.mode == 'Normal'"
  },
  // Move the cursor right 1 screen
  {
    "key": "ctrl+l",
    "command": "workbench.action.focusRightGroup",
    "when": "inputFocus && vim.mode == 'Normal'"
  },

  // New file
  {
    "key": "a",
    "command": "explorer.newFile",
    "when": " explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus "
  },
  // New folder
  {
    "key": "shift+a",
    "command": "explorer.newFolder",
    "when": " explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus "
  },
  // Refresh resource manager
  {
    "key": "r",
    "command": "workbench.files.action.refreshFilesExplorer",
    "when": " explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus "
  },
  // Rename file or directory
  {
    "key": "r",
    "command": "renameFile",
    "when": " explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus "
  },
  // Delete file or directory
  {
    "key": "d",
    "command": "deleteFile",
    "when": " explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus "
  },
  // Cut file or directory
  {
    "key": "x",
    "command": "filesExplorer.cut",
    "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !explorerResourceReadonly && !inputFocus"
  },
  // Copy file or directory
  {
    "key": "y",
    "command": "filesExplorer.copy",
    "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsRoot && !inputFocus"
  },
  // Paste file or directory
  {
    "key": "p",
    "command": "filesExplorer.paste",
    "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceReadonly && !inputFocus"
  }
]
```
