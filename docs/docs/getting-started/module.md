---
id: module
title: NgModule App
sidebar_position: 2
---

# NgModule App

:::warning Deprecated
`NgxErrorMessageModule` is kept for backward compatibility but will be removed in a future major version. Prefer `provideNgxErrorMessage()` — including in NgModule apps, since it returns a plain `Provider[]` you can drop into your own `providers` array.
:::

For apps that still bootstrap via `NgModule` (or that target Angular versions below 14), use `NgxErrorMessageModule`.

```typescript
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { provideHttpClient } from '@angular/common/http'
import { provideTranslateService } from '@ngx-translate/core'
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader'
import { NgxErrorMessageModule } from 'ngx-error-message'
import { withNgxTranslate } from 'ngx-error-message/ngx-translate'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxErrorMessageModule.forRoot(), // NgxErrorMessageModule added default config
    // other modules...
  ],
  providers: [
    provideHttpClient(),
    provideTranslateService({ fallbackLang: 'en' }),
    provideTranslateHttpLoader(), // Make sure your assets files are in default assets/i18n/*
    withNgxTranslate(), // Required for NgxErrorMessageModule to use @ngx-translate too
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Use `NgxErrorMessageModule.forChild()` in feature modules the same way you would with `forRoot()`.

## Custom prefixes

```typescript
NgxErrorMessageModule.forRoot({
  validationsPrefix: 'VALIDATIONS',
  patternsPrefix: 'PATTERNS',
}),
```

## Without internationalization

Omit `withNgxTranslate()` from `providers` and pass the messages directly to `forRoot()`:

```typescript
NgxErrorMessageModule.forRoot({
  errorMessages: {
    required: 'This field is required.',
    email: 'This is not a valid email address.',
    // ...
  },
}),
```

Continue to [Configuration](../configuration) to see the translation file format and every available option.
