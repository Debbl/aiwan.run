---
title: 在 Mac 上使用 caffeinate 防止睡眠
date: 2025-02-05T09:44:51.339Z
duration: 3min
---

# 在 Mac 上使用 caffeinate 防止睡眠

有时候一些程序需要长时间运行，比如 `npm run dev` 或者 `pnpm dev`，这些程序运行时，当 Mac 进入睡眠状态，可能会导致程序中断。

可以使用 `caffeinate` 命令来防止 Mac 进入睡眠状态。

```sh
caffeinate -i npm run dev
```

## 一些其他的参数

```sh
❯ caffeinate --help
caffeinate: illegal option -- -
usage: caffeinate [-disu] [-t timeout] [-w Process ID] [command arguments...]
```

```sh
# 阻止机器休眠（后台跑程序、听歌等，屏幕过段时间后会自动关闭）
caffeinate

# 阻止屏幕（-d display）休眠
caffeinate -d

# 阻止休眠一段时间（-t [阻止休眠秒数]）
caffeinate -t 3600

# 该命令能让进程一直保持运行
caffeinate -w <进程号>
```

## 参考

- https://xujinzh.github.io/2021/08/31/mac-pid-keep-runing-caffeinate/index.html
- https://gist.github.com/xkniu/6561069c10de812b7521217aafb2e46f?utm_source=chatgpt.com
