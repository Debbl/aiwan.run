---
title: windows git set eol to lf
description: Learn how to configure Git on Windows to use LF line endings instead of CRLF, including global settings and .gitattributes configuration for consistent cross-platform development
date: 2024-01-14T03:29:13.000Z
duration: 3min
keywords:
  - windows
  - git
  - eol
  - lf
  - crlf
  - github action
---

# windows git set eol to lf

## 原因

在写 [Debbl/eslint-config](https://github.com/Debbl/eslint-config) 的测试时

```ts title="fixture.text.ts"
await Promise.all(
  files.map(async (file) => {
    let content = await fs.readFile(join(target, file), 'utf-8')
    const source = await fs.readFile(join(from, file), 'utf-8')

    if (content === source) {
      content = '// unchanged\n'
    }

    await expect.soft(content).toMatchFileSnapshot(join(output, file))
  }),
)
```

在 github action 中有使用多个系统的测试

```yml
strategy:
  matrix:
    node: [lts/*]
    os: [ubuntu-latest, windows-latest, macos-latest]
  fail-fast: false
```

但是在测试 windows 时总是报错 [test](https://github.com/Debbl/eslint-config/actions/runs/6914251251/job/18811912790)，显示 input 和 output 不符合，在测试后发现是 windows 默认的在 git 下载是的 `eol` 是 `crlf`

所以搜了一下在 GitHub Action 如何设置 `eol` 为 `lf` [actions/checkout#135](https://github.com/actions/checkout/issues/135)

最终添加如下命令 [ci.yml](https://github.com/Debbl/eslint-config/blob/main/.github/workflows/ci.yml)

windows 可以通过以下命令设置为 `lf`

```bash
git config --global core.autocrlf false
git config --global core.eol lf
```

```yml
- name: Set git to use LF
  run: |
    git config --global core.autocrlf false
    git config --global core.eol lf
```

## 通过 `.gitattributes` 设置

```
* text=auto eol=lf
```

## 引用

- [https://git-scm.com/docs/gitattributes](https://git-scm.com/docs/gitattributes)
