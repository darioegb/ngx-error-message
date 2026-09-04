---
id: module
title: NgModule App
sidebar_position: 2
---

# NgModule App

For apps that still bootstrap via `NgModule` (or that target Angular versions below 14), use `NgxErrorMessageModule`.

```typescript
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { NgxErrorMessageModule } from 'ngx-error-message'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http) // Make sure your assets files are in default assets/i18n/*
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Required module for ngx-translate
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxErrorMessageModule.forRoot(), // NgxErrorMessageModule added default config
    // other modules...
  ],
  providers: [],
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
