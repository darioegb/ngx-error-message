---
id: installation
title: Instalación
sidebar_position: 2
---

# Instalación

```bash
npm install ngx-error-message --save
```

`@ngx-translate` es una dependencia **opcional** — instalala solo si querés mensajes de error traducidos:

```bash
npm install @ngx-translate/core --save
npm install @ngx-translate/http-loader --save
```

Consultá el [repositorio de ngx-translate en GitHub](https://github.com/ngx-translate/core) para más información sobre ese paquete.

A continuación, configurá la librería según el tipo de app:

- [Apps standalone](./getting-started/standalone) — recomendado para Angular >= 14.
- [Apps con NgModule](./getting-started/module) — para apps que todavía usan el estilo de bootstrap con `NgModule`.
