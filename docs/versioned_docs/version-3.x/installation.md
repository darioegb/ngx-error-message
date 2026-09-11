---
id: installation
title: Installation
sidebar_position: 2
---

# Installation

```bash
npm install ngx-error-message --save
```

`@ngx-translate` is an **optional** dependency — only install it if you want translated error messages:

```bash
npm install @ngx-translate/core --save
npm install @ngx-translate/http-loader --save
```

See the [ngx-translate GitHub repository](https://github.com/ngx-translate/core) for more information about that package.

Next, wire up the library for your app type:

- [Standalone apps](./getting-started/standalone) — recommended for Angular >= 14.
- [NgModule apps](./getting-started/module) — for apps still on the `NgModule` bootstrap style.
