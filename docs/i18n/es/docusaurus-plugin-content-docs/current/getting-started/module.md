---
id: module
title: App con NgModule
sidebar_position: 2
---

# App con NgModule

:::warning Deprecado
`NgxErrorMessageModule` se mantiene por retrocompatibilidad, pero será eliminado en una futura versión major. Preferí `provideNgxErrorMessage()` — incluso en apps con NgModule, ya que devuelve un `Provider[]` común que podés poner directamente en tu propio array `providers`.
:::

Para apps que todavía hacen bootstrap vía `NgModule` (o que apuntan a versiones de Angular anteriores a la 14), usá `NgxErrorMessageModule`.

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
    NgxErrorMessageModule.forRoot(), // NgxErrorMessageModule agregado con config por defecto
    // otros módulos...
  ],
  providers: [
    provideHttpClient(),
    provideTranslateService({ fallbackLang: 'en' }),
    provideTranslateHttpLoader(), // Asegurate de que tus archivos de assets estén en assets/i18n/* por defecto
    withNgxTranslate(), // Necesario para que NgxErrorMessageModule también use @ngx-translate
  ],
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

Omití `withNgxTranslate()` de `providers` y pasá los mensajes directamente a `forRoot()`:

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
