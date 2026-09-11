---
id: standalone
title: Standalone App
sidebar_position: 1
---

# Standalone App

If your app uses standalone components (Angular >= 14), install the library with the `provideNgxErrorMessage` provider in your bootstrap configuration, and wire up `@ngx-translate` with `withNgxTranslate()`.

```typescript
import { provideNgxErrorMessage } from 'ngx-error-message'
import { withNgxTranslate } from 'ngx-error-message/ngx-translate'
import { provideHttpClient } from '@angular/common/http'
import { provideTranslateService } from '@ngx-translate/core'
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader'

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideTranslateService({ fallbackLang: 'en' }),
    provideTranslateHttpLoader(), // Make sure your assets files are in default assets/i18n/*
    provideNgxErrorMessage(withNgxTranslate()),
    // ...other providers
  ],
})
```

> `@ngx-translate/core` is a peer dependency, not a hard one: `provideNgxErrorMessage()` on its own works fine and simply doesn't translate anything, unless you also pass an `errorMessages` dictionary (see [Without internationalization](#without-internationalization) below). `withNgxTranslate()`, from the `ngx-error-message/ngx-translate` secondary entry point, is what wires the two together — forgetting it is the most common reason error messages render empty.

## Custom prefixes

`provideNgxErrorMessage()` is composable, like Angular's own `provideHttpClient(withXhr(), ...)` — pass any number of `withXxx()` features:

```typescript
provideNgxErrorMessage(
  withErrorMessageConfig({
    validationsPrefix: 'VALIDATIONS',
    patternsPrefix: 'PATTERNS',
  }),
  withNgxTranslate(),
)
```

## Without internationalization

Omit `withNgxTranslate()` entirely and pass the messages directly:

```typescript
provideNgxErrorMessage(
  withErrorMessageConfig({
    errorMessages: {
      required: 'This field is required.',
      email: 'This is not a valid email address.',
      // ...
    },
  }),
)
```

Continue to [Configuration](../configuration) to see the translation file format and every available option.
