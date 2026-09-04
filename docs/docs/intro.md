---
id: intro
slug: /
title: Introduction
sidebar_position: 1
---

# NgxErrorMessage

[![CI](https://github.com/darioegb/ngx-error-message/actions/workflows/ci.yml/badge.svg)](https://github.com/darioegb/ngx-error-message/actions/workflows/ci.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=darioegb_ngx-error-message&metric=alert_status)](https://sonarcloud.io/dashboard?id=darioegb_ngx-error-message)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=darioegb_ngx-error-message&metric=coverage)](https://sonarcloud.io/dashboard?id=darioegb_ngx-error-message)

**NgxErrorMessage** is an Angular library that automatically displays form validation error messages for reactive and template-driven forms, with optional [@ngx-translate](https://github.com/ngx-translate/core) support.

## Features

- ✅ **Automatic error display** — add one directive to an input and get its error message for free
- ✅ **Reactive and template-driven forms** — same directive works for both
- ✅ **Internationalization** — optional integration with `@ngx-translate/core`
- ✅ **Customizable styling** — override the CSS classes used for the error container and message
- ✅ **Conditional display** — control exactly when an error should be shown (`touched`, `dirty`, `invalid`, ...)
- ✅ **Built-in and custom patterns** — a set of ready-to-use regex patterns, plus support for your own
- ✅ **Standalone-first** — `provideNgxErrorMessage()` for standalone apps; `NgxErrorMessageModule` for NgModule apps

## Live Example

You can see the library in action here: [ngx-error-message-example](https://stackblitz.com/edit/ngx-error-message-example).

## How It Works

Add the `ngxErrorMessage` directive to a form control. When the control becomes invalid (and matches the configured display condition), the directive renders the message for its first active error, resolved either from a static configuration object or from your `@ngx-translate` translation files.

```
<input formControlName="email" ngxErrorMessage />
    └─▶ control becomes invalid + touched
         └─▶ NgxErrorMessage reads control.errors
              └─▶ resolves the message for the first error key
                   └─▶ renders it next to the input
```

## Compatibility

Latest version available for each version of Angular:

| ngx-error-message | Angular      |
| ----------------- | ------------ |
| 3.1.0             | 16.x to 19.x |
| 3.0.1             | 16.x to 19.x |
| 3.0.0             | 16.x to 19.x |
| 2.2.1             | 10.x to 14.x |
| 2.2.0             | 10.x to 14.x |
| 2.1.0             | 9.x to 13.x  |
| 2.0.1             | 8.x to 11.x  |
| 2.0.0             | 8.x to 11.x  |
| 1.3.0             | 9.x 8.x 7.x  |
