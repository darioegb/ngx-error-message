---
id: v3-to-v4
title: v3 to v4
sidebar_position: 1
---

# Migrating from v3 to v4

v4 bumps the peer floor to **Angular >= 20** and changes how the library is configured. Template usage is unaffected: `ngxErrorMessage`, `[classNames]`, `[patternKey]`, `[when]`, the JSON translation file format, `regEx`, and the default CSS class names are all identical to v3.

## `provideNgxErrorMessage()` is now composable

The config object argument was replaced with a list of `withXxx()` features, matching Angular's own `provideHttpClient(withXhr(), ...)` idiom.

```diff
- provideNgxErrorMessage({
-   validationsPrefix: 'VALIDATIONS',
- })
+ provideNgxErrorMessage(
+   withErrorMessageConfig({ validationsPrefix: 'VALIDATIONS' }),
+ )
```

Calling `provideNgxErrorMessage()` with no arguments still works and behaves the same as before.

## `@ngx-translate/core` moved to a secondary entry point

In v3, `@ngx-translate/core` was wired in automatically as soon as it was installed. In v4 it's opt-in via `withNgxTranslate()`, imported from `ngx-error-message/ngx-translate`:

```diff
  import { provideNgxErrorMessage } from 'ngx-error-message'
+ import { withNgxTranslate } from 'ngx-error-message/ngx-translate'

  provideNgxErrorMessage(
-   // ngx-translate was picked up automatically if installed
+   withNgxTranslate(),
  )
```

If you don't add `withNgxTranslate()`, messages resolve to an empty string unless you also configure `errorMessages` via `withErrorMessageConfig()`. Forgetting this step is the most common migration mistake — see [Standalone App](../getting-started/standalone) for the full setup.

This also bumps the `@ngx-translate/core` peer floor to **>= 18**, which itself dropped `TranslateModule` in favor of `provideTranslateService()` — see the [ngx-translate migration guide](https://github.com/ngx-translate/core/blob/master/projects/ngx-translate/core/CHANGELOG.md) if you're upgrading that package too.

## `NgxErrorMessageModule` is deprecated, not removed

If you bootstrap via `NgModule`, no code change is required — but plan to move to `provideNgxErrorMessage()` eventually, since the module will be removed in a future major version. See [NgModule App](../getting-started/module) for the updated wiring, including `withNgxTranslate()`.

## `LEGACY_ERROR_PRIORITY` was removed

v3 picked whichever error a control's validators registered last, which was really just JavaScript object key insertion order — not something anyone chose on purpose. v4 defaults to `DEFAULT_ERROR_PRIORITY` (`required` → `email` → `pattern` → `minlength` → `maxlength` → `min` → `max`), which is a deliberate, documented order.

If you relied on the old insertion-order fallback, pass an empty array to get the same behavior:

```typescript
provideNgxErrorMessage(withErrorMessageConfig({ errorPriority: [] }))
```

See [Error priority](../configuration#error-priority) for details.

## Angular peer floor: `>= 20`

v4 requires Angular 20 or later (up from 16 in v3). Run `ng update` to bring your app's Angular version up before installing `ngx-error-message@4`.
