---
id: v3-to-v4
title: v3 a v4
sidebar_position: 1
---

# Migrando de v3 a v4

v4 sube el piso de peer a **Angular >= 20** y cambia cómo se configura la librería. El uso en el template no cambia: `ngxErrorMessage`, `[classNames]`, `[patternKey]`, `[when]`, el formato del archivo JSON de traducción, `regEx` y los nombres de clase CSS por defecto son idénticos a v3.

## `provideNgxErrorMessage()` ahora es composable

El argumento de objeto de configuración fue reemplazado por una lista de features `withXxx()`, siguiendo el mismo patrón que `provideHttpClient(withXhr(), ...)` de Angular.

```diff
- provideNgxErrorMessage({
-   validationsPrefix: 'VALIDATIONS',
- })
+ provideNgxErrorMessage(
+   withErrorMessageConfig({ validationsPrefix: 'VALIDATIONS' }),
+ )
```

Llamar a `provideNgxErrorMessage()` sin argumentos sigue funcionando igual que antes.

## `@ngx-translate/core` se movió a un entry point secundario

En v3, `@ngx-translate/core` se conectaba automáticamente apenas estaba instalado. En v4 es opt-in vía `withNgxTranslate()`, importado desde `ngx-error-message/ngx-translate`:

```diff
  import { provideNgxErrorMessage } from 'ngx-error-message'
+ import { withNgxTranslate } from 'ngx-error-message/ngx-translate'

  provideNgxErrorMessage(
-   // ngx-translate se detectaba automáticamente si estaba instalado
+   withNgxTranslate(),
  )
```

Si no agregás `withNgxTranslate()`, los mensajes se resuelven como string vacío, a menos que también configures `errorMessages` vía `withErrorMessageConfig()`. Olvidarse de este paso es el error de migración más común — ver [App Standalone](../getting-started/standalone) para la configuración completa.

Esto también sube el piso de peer de `@ngx-translate/core` a **>= 18**, que a su vez eliminó `TranslateModule` en favor de `provideTranslateService()` — ver la [guía de migración de ngx-translate](https://github.com/ngx-translate/core/blob/master/projects/ngx-translate/core/CHANGELOG.md) si también estás actualizando ese paquete.

## `NgxErrorMessageModule` está deprecado, no eliminado

Si hacés bootstrap vía `NgModule`, no necesitás cambiar nada — pero planificá migrar a `provideNgxErrorMessage()` eventualmente, ya que el módulo será eliminado en una futura versión major. Ver [App con NgModule](../getting-started/module) para la configuración actualizada, incluyendo `withNgxTranslate()`.

## Se eliminó `LEGACY_ERROR_PRIORITY`

v3 elegía el último error que sus validadores registraban en el control, que en la práctica era simplemente el orden de inserción de claves de JavaScript — no algo que nadie eligiera a propósito. v4 usa por defecto `DEFAULT_ERROR_PRIORITY` (`required` → `email` → `pattern` → `minlength` → `maxlength` → `min` → `max`), un orden deliberado y documentado.

Si dependías del viejo fallback por orden de inserción, pasá un array vacío para obtener el mismo comportamiento:

```typescript
provideNgxErrorMessage(withErrorMessageConfig({ errorPriority: [] }))
```

Ver [Prioridad de errores](../configuration#prioridad-de-errores) para más detalle.

## Piso de Angular: `>= 20`

v4 requiere Angular 20 o superior (antes 16 en v3). Corré `ng update` para actualizar la versión de Angular de tu app antes de instalar `ngx-error-message@4`.
