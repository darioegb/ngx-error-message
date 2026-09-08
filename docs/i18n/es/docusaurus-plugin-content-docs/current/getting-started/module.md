---
id: module
title: App con NgModule
sidebar_position: 2
---

# App con NgModule

Para apps que todavía hacen bootstrap vía `NgModule` (o que apuntan a versiones de Angular anteriores a la 14), usá `NgxErrorMessageModule`.

```typescript
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { NgxErrorMessageModule } from 'ngx-error-message'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http) // Asegurate de que tus archivos de assets estén en assets/i18n/* por defecto
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Módulo requerido por ngx-translate
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxErrorMessageModule.forRoot(), // NgxErrorMessageModule agregado con config por defecto
    // otros módulos...
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Usá `NgxErrorMessageModule.forChild()` en módulos de feature de la misma manera que `forRoot()`.

## Prefijos personalizados

```typescript
NgxErrorMessageModule.forRoot({
  validationsPrefix: 'VALIDATIONS',
  patternsPrefix: 'PATTERNS',
}),
```

## Sin internacionalización

```typescript
NgxErrorMessageModule.forRoot({
  errorMessages: {
    required: 'This field is required.',
    email: 'This is not a valid email address.',
    // ...
  },
}),
```

Continuá con [Configuración](../configuration) para ver el formato del archivo de traducción y todas las opciones disponibles.
