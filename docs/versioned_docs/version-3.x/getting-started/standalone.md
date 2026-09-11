---
id: standalone
title: Standalone App
sidebar_position: 1
---

# Standalone App

If your app uses standalone components (Angular >= 14), install the library with the `provideNgxErrorMessage` provider in your bootstrap configuration.

```typescript
import { provideNgxErrorMessage } from 'ngx-error-message'
import { importProvidersFrom } from '@angular/core'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http) // Make sure your assets files are in default assets/i18n/*
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        useDefaultLang: true,
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
    provideNgxErrorMessage(),
    // ...other providers
  ],
})
```

## Custom prefixes

```typescript
provideNgxErrorMessage({
  validationsPrefix: 'VALIDATIONS',
  patternsPrefix: 'PATTERNS',
})
```

## Without internationalization

Omit the `@ngx-translate` wiring entirely and pass the messages directly — see [Configuration](../configuration) for the full shape.

```typescript
provideNgxErrorMessage({
  errorMessages: {
    required: 'This field is required.',
    email: 'This is not a valid email address.',
    // ...
  },
})
```

Continue to [Configuration](../configuration) to see the translation file format and every available option.
