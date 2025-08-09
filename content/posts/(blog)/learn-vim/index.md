---
title: Learn Vim
description: Learn Vim editor, including various mode switching, text editing commands, movement operations, search and replace, etc.
date: 2021-08-14T08:25:51.000Z
duration: 10min
keywords:
  - Vim
  - Editor
  - Text Editing
  - VSCode
---

## Mode

> VIM has multiple modes: basic mode and derived mode

### Basic mode

#### Normal mode

> Default mode, the first time you open a file with VIM, you enter this mode. Also called command mode

> Use `Ctrl + g` to display the current file name and some other information

#### Visual mode

> In Normal mode, enter `v` , `V` or `Ctrl + v` to enter visual mode. This mode can select an editing area, and then perform `insert` , `delete` , `replace` , `change case` etc. operations on the selected file content.

- Character selection mode: select all **characters** passed by the cursor, enter `v` in normal mode

- Line selection mode: select all **lines** passed by the cursor, enter `V` in normal mode
- Block selection mode: select all text in a rectangular box, enter `Ctrl + v` in normal mode

> Use `o` to switch between the **top left** and **bottom right** of the selected area

#### Select mode

- Use mouse or cursor key to highlight text

- Any input will replace the highlighted text

- Enter insert mode

> https://www.bilibili.com/read/cv12497070

#### Insert mode

> You can insert your input into the current document

> Enter **insert mode** from **normal mode**

- `i` 光标的**前**一个字符处
- `I` 光标当前行的**行首**
- `a` 光标的**后**一个字符处
- `A` 光标当前行的**行尾**
- `o` 光标当前行的**下一行**
- `O` 光标当前行的**上一行**

#### Command-Line mode

> Enter **command-line mode** from **normal mode**

> Some commonly used commands

- `:set number` display line number, short for `:se[t] nu[mber]`
- `:set nonumber` close display line number, short for `:se[t] nonu[mber]`
- `:set relativenumber` display relative line number, short for `se[t] rnu` , this will set `:se nu` at the same time, the current line will display the absolute line number, and the upper and lower parts will display the relative line number
- `:w` save the current edited file
- `:wq` save the current edited file and exit
- `:w!` force to save the current file
- `:q` exit vim
- `:q!` force exit
- `:write [fileName]` save the current file as `fileName` and open
- `:saveas [fileName]` save the current file as `fileName`, short for `:sav [fileName]`
- `/` search, `n` find the previous, `N` find the previous

reference

https://www.bilibili.com/read/cv12686699

#### Ex mode

> Ex means Execute

> Use `gQ` in **normal mode** to enter, use `:visual` to exit

> https://www.bilibili.com/read/cv12497070

### Vim text editing commands

#### Insert

> Enter **insert mode** from **normal mode**

- `i` the **previous** character of the cursor
- `I` the **beginning** of the current line
- `a` the **next** character of the cursor
- `A` the **end** of the current line
- `o` the **next line** below the cursor
- `O` the **previous line** above the cursor

#### Delete

> In **normal mode**

- `x` delete the **one** character at the cursor position
- `dd` delete the **line** where the cursor is located
- `d0` delete the **beginning** of the current line
- `d$` delete the **end** of the current line
- `db` 、`dB` delete the **beginning** of the current word
- `dw` 、`dW ` delete the **end** of the current word
- `cb` 、`cB` delete the **beginning** of the current word, and enter **insert mode**
- `cw` 、`cW` delete the **end** of the current word, and enter **insert mode**

#### Copy, paste

> In **normal mode**

- `yw` copy the content from the cursor position to the **end** of the current word
- `yy` copy the current **line**

- `p` copy the copied text content to the **next** character of the cursor
- `P` copy the copied text content to the **previous** character of the cursor

#### Replace

- `r` replace the **one** character at the cursor position
- `R` replace until the `ESC` key is pressed

#### Undo

- `u` undo
- `U` undo the content

#### Save

- `:w` save the current edited file
- `:wq` save the current edited file and exit
- `:w!` force to save the current file

#### Save as

- `:write [fileName]` save the current file as `fileName` and open
- `:saveas [fileName]` save the current file as `fileName`, short for `:sav [fileName]`

### Vim position

- In **normal mode**, you can use `h` 、`j` 、`k` 、`l` to move **left** , **down** , **up** , **right**

- `gg` to the **beginning** of the current line
- `G` to the **end** of the current line

### Reference

- http://vimdoc.sourceforge.net/
- https://www.runoob.com/linux/linux-vim.html
