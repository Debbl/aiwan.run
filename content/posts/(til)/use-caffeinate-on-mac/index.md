---
title: Use caffeinate on Mac to prevent sleep
description: Learn how to use the caffeinate command on Mac to prevent system sleep, ensuring that long-running programs (such as development servers) will not be interrupted by system sleep
date: 2025-02-05T09:44:51.339Z
duration: 3min
keywords:
  - caffeinate
  - mac
  - prevent sleep
  - sleep
  - hibernate
  - process
---

# Use caffeinate on Mac to prevent sleep

Sometimes some programs need to run for a long time, such as `npm run dev` or `pnpm dev`, these programs run when Mac enters sleep, which may cause the program to interrupt.

You can use the `caffeinate` command to prevent Mac from entering sleep.

```sh
caffeinate -i npm run dev
```

## Some other parameters

```sh
❯ caffeinate --help
caffeinate: illegal option -- -
usage: caffeinate [-disu] [-t timeout] [-w Process ID] [command arguments...]
```

```sh
# Prevent machine sleep (run programs in the background, listen to music, etc., the screen will automatically close after a period of time)
caffeinate

# Prevent screen sleep (-d display)
caffeinate -d

# Prevent sleep for a period of time (-t [prevent sleep seconds])
caffeinate -t 3600

# This command keeps the process running
caffeinate -w <进程号>
```

## Reference

- https://xujinzh.github.io/2021/08/31/mac-pid-keep-runing-caffeinate/index.html
- https://gist.github.com/xkniu/6561069c10de812b7521217aafb2e46f?utm_source=chatgpt.com
