---
id: standalone
title: App Standalone
sidebar_position: 1
---

# App Standalone

Si tu app usa componentes standalone (Angular >= 14), instalá la librería con el provider `provideNgxErrorMessage` en tu configuración de bootstrap.

```typescript
import { provideNgxErrorMessage } from 'ngx-error-message'
import { importProvidersFrom } from '@angular/core'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http) // Asegurate de que tus archivos de assets estén en assets/i18n/* por defecto
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
    // ...otros providers
  ],
})
```

## Prefijos personalizados

```typescript
provideNgxErrorMessage({
  validationsPrefix: 'VALIDATIONS',
  patternsPrefix: 'PATTERNS',
})
```

## Sin internacionalización

Omití por completo la configuración de `@ngx-translate` y pasá los mensajes directamente — ver [Configuración](../configuration) para el formato completo.

```typescript
provideNgxErrorMessage({
  errorMessages: {
    required: 'This field is required.',
    email: 'This is not a valid email address.',
    // ...
  },
})
```

Continuá con [Configuración](../configuration) para ver el formato del archivo de traducción y todas las opciones disponibles.
