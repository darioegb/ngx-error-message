---
id: intro
slug: /
title: Introducción
sidebar_position: 1
---

# NgxErrorMessage

[![CI](https://github.com/darioegb/ngx-error-message/actions/workflows/ci.yml/badge.svg)](https://github.com/darioegb/ngx-error-message/actions/workflows/ci.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=darioegb_ngx-error-message&metric=alert_status)](https://sonarcloud.io/dashboard?id=darioegb_ngx-error-message)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=darioegb_ngx-error-message&metric=coverage)](https://sonarcloud.io/dashboard?id=darioegb_ngx-error-message)

**NgxErrorMessage** es una librería de Angular que muestra automáticamente mensajes de error de validación para formularios reactivos y template-driven, con soporte opcional de [@ngx-translate](https://github.com/ngx-translate/core).

## Características

- ✅ **Visualización automática de errores** — agregá una directiva a un input y obtené su mensaje de error gratis
- ✅ **Formularios reactivos y template-driven** — la misma directiva funciona para ambos
- ✅ **Internacionalización** — integración opcional con `@ngx-translate/core`
- ✅ **Estilos personalizables** — sobrescribí las clases CSS usadas para el contenedor y el mensaje de error
- ✅ **Visualización condicional** — controlá exactamente cuándo se debe mostrar un error (`touched`, `dirty`, `invalid`, ...)
- ✅ **Patrones incorporados y personalizados** — un conjunto de patrones regex listos para usar, más soporte para los tuyos
- ✅ **Standalone-first** — `provideNgxErrorMessage()` para apps standalone; `NgxErrorMessageModule` para apps con NgModule

## Ejemplo en Vivo

Podés ver la librería en acción acá: [ngx-error-message-example](https://stackblitz.com/edit/ngx-error-message-example).

## Cómo Funciona

Agregá la directiva `ngxErrorMessage` a un control de formulario. Cuando el control se vuelve inválido (y coincide con la condición de visualización configurada), la directiva renderiza el mensaje de su primer error activo, resuelto desde un objeto de configuración estático o desde tus archivos de traducción de `@ngx-translate`.

```
<input formControlName="email" ngxErrorMessage />
    └─▶ el control se vuelve inválido + touched
         └─▶ NgxErrorMessage lee control.errors
              └─▶ resuelve el mensaje del primer error
                   └─▶ lo renderiza junto al input
```

## Compatibilidad

Última versión disponible para cada versión de Angular:

| ngx-error-message | Angular     |
| ----------------- | ----------- |
| 3.1.0             | 16.x a 19.x |
| 3.0.1             | 16.x a 19.x |
| 3.0.0             | 16.x a 19.x |
| 2.2.1             | 10.x a 14.x |
| 2.2.0             | 10.x a 14.x |
| 2.1.0             | 9.x a 13.x  |
| 2.0.1             | 8.x a 11.x  |
| 2.0.0             | 8.x a 11.x  |
| 1.3.0             | 9.x 8.x 7.x |
