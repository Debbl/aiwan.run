---
title: npm 常用命令
description: npm 常用的命令
date: 2021-05-30T07:31:04.000Z
duration: 5min
keywords:
  - npm
  - 常用命令
  - 命令
  - 安装
  - 卸载
  - 搜索
---

### 查看当前 npm 配置

```bash
npm config list
```

### 创建模块

> 会生成一个package.json文件有当前项目的信息

```bash
npm init
```

### CNPM淘宝镜像

> 查看当前镜像源

```bash
npm get registry
```

> 设置为淘宝镜像源

```bash
npm config set registry http://registry.npm.taobao.org/
```

> 设置回默认的官方镜像

```bash
npm config set registry https://registry.npmjs.org/
```

> 也可以直接选择安装 cnpm

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 安装Node模块

> 会新建一个node_modules目录

```bash
npm install <Module Name>
```

> 全局安装

```bash
npm install <Module Name> --global
# 或
npm install <Modele Name> -g
```

> 安装在当前目录的node_modules，并把模块的信息加入package.json的dependencies中（生产环境依赖）

```bash
npm install <Module Name> --save
# 或
npm install <Module Name> -S
```

> 安装在当前目录的node_modules，并把模块的信息加入package.json的devDependencies中（开发环境依赖）

```bash
npm install <Module Name> --save-dev
# 或
npm install <Module Name> -D
```

### 卸载模块

```bash
npm uninstall <Module Name>
```

### 搜索模块

```bash
npm search <Module Name>
```

### 升级NPM

```bash
# 查看版本
npm -v
# 升级
npm install npm -g
```

### 代理相关

> 查看当前代理

```bash
npm config get proxy
```

> 设置代理

```bash
npm config set proxy=http://server:port
```

> 如果出现以下错误

```bash
npm err! Error: connect ECONNREFUSED 127.0.0.1:8087
```

> 解决办法（清除代理）

```bash
npm config set proxy null
```

### 查看安装信息

> 查看全局安装的模块

```bash
npm list -g
```

### 更新模块

```bash
npm update <Module Name>
```

### 清空本地缓存

```bash
npm cache clear --force
```
