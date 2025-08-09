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

## Reason

When writing the test of [Debbl/eslint-config](https://github.com/Debbl/eslint-config)

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

In github action, there is a test using multiple systems

```yml
strategy:
  matrix:
    node: [lts/*]
    os: [ubuntu-latest, windows-latest, macos-latest]
  fail-fast: false
```

When testing windows, there is always an error [test](https://github.com/Debbl/eslint-config/actions/runs/6914251251/job/18811912790), the input and output do not match, and after testing, it is found that the `eol` of windows default when git is downloaded is `crlf`

So I searched for how to set `eol` to `lf` in GitHub Action [actions/checkout#135](https://github.com/actions/checkout/issues/135)

Finally, add the following command [ci.yml](https://github.com/Debbl/eslint-config/blob/main/.github/workflows/ci.yml)

Windows can be set to `lf` through the following command

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

## Set through `.gitattributes`

```
* text=auto eol=lf
```

## Reference

- [https://git-scm.com/docs/gitattributes](https://git-scm.com/docs/gitattributes)
