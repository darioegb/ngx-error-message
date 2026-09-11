---
id: standalone
title: App Standalone
sidebar_position: 1
---

# App Standalone

Si tu app usa componentes standalone (Angular >= 14), instalá la librería con el provider `provideNgxErrorMessage` en tu configuración de bootstrap, y conectá `@ngx-translate` con `withNgxTranslate()`.

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
    provideTranslateHttpLoader(), // Asegurate de que tus archivos de assets estén en assets/i18n/* por defecto
    provideNgxErrorMessage(withNgxTranslate()),
    // ...otros providers
  ],
})
```

> `@ngx-translate/core` es una peer dependency, no una dependencia obligatoria: `provideNgxErrorMessage()` solo ya funciona, simplemente no traduce nada a menos que también le pases un diccionario `errorMessages` (ver [Sin internacionalización](#sin-internacionalización) más abajo). `withNgxTranslate()`, del entry point secundario `ngx-error-message/ngx-translate`, es lo que conecta ambas cosas — olvidarlo es la causa más común de que los mensajes de error rendericen vacíos.

## Prefijos personalizados

`provideNgxErrorMessage()` es composable, como el propio `provideHttpClient(withXhr(), ...)` de Angular — pasale la cantidad de features `withXxx()` que necesites:

```typescript
provideNgxErrorMessage(
  withErrorMessageConfig({
    validationsPrefix: 'VALIDATIONS',
    patternsPrefix: 'PATTERNS',
  }),
  withNgxTranslate(),
)
```

## Sin internacionalización

Omití `withNgxTranslate()` por completo y pasá los mensajes directamente:

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

Continuá con [Configuración](../configuration) para ver el formato del archivo de traducción y todas las opciones disponibles.
