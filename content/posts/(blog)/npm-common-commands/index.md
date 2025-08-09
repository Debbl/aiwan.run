---
title: npm common commands
description: Collect and organize common commands for the npm package manager, including module installation and uninstallation, configuration management, mirror source settings, version control, and other practical techniques.
date: 2021-05-30T07:31:04.000Z
duration: 5min
keywords:
  - npm
  - Common Commands
  - Command
  - Install
  - Uninstall
  - Search
---

### View current npm configuration

```bash
npm config list
```

### Create module

> It will generate a package.json file with the information of the current project

```bash
npm init
```

### CNPM Taobao mirror

> View current mirror source

```bash
npm get registry
```

> Set to Taobao mirror source

```bash
npm config set registry http://registry.npm.taobao.org/
```

> Set back to the default official mirror

```bash
npm config set registry https://registry.npmjs.org/
```

> You can also install cnpm directly

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### Install Node module

> It will create a node_modules directory

```bash
npm install <Module Name>
```

> Global installation

```bash
npm install <Module Name> --global
# or
npm install <Modele Name> -g
```

> Install in the current directory's node_modules, and add the module information to the package.json's dependencies (production environment dependencies)

```bash
npm install <Module Name> --save
# or
npm install <Module Name> -S
```

> Install in the current directory's node_modules, and add the module information to the package.json's devDependencies (development environment dependencies)

```bash
npm install <Module Name> --save-dev
# or
npm install <Module Name> -D
```

### Uninstall module

```bash
npm uninstall <Module Name>
```

### Search module

```bash
npm search <Module Name>
```

### Upgrade NPM

```bash
# View version
npm -v
# Upgrade
npm install npm -g
```

### Proxy related

> View current proxy

```bash
npm config get proxy
```

> Set proxy

```bash
npm config set proxy=http://server:port
```

> If the following error occurs

```bash
npm err! Error: connect ECONNREFUSED 127.0.0.1:8087
```

> Solution (clear proxy)

```bash
npm config set proxy null
```

### View installation information

> View globally installed modules

```bash
npm list -g
```

### Update module

```bash
npm update <Module Name>
```

### Clear local cache

```bash
npm cache clear --force
```
