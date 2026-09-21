---
id: signal-forms
title: Signal Forms
sidebar_position: 6
---

# Signal Forms

Angular 22 introduce [Signal Forms](https://angular.dev/guide/forms/signals) (`@angular/forms/signals`) como una alternativa estable, basada en signals, a los Formularios Reactivos y basados en Plantillas. `[ngxErrorMessage]` funciona sobre un input nativo enlazado con `[formField]`, exactamente igual que con `formControlName` o `ngModel` - sin configuración extra, sin entry point secundario, sin nueva dependencia de pares.

```typescript
import { Component, signal } from '@angular/core'
import {
  form,
  FormField,
  email,
  minLength,
  required,
} from '@angular/forms/signals'
import { NgxErrorMessageDirective } from 'ngx-error-message'

@Component({
  selector: 'app-signup',
  imports: [FormField, NgxErrorMessageDirective],
  template: `
    <input [formField]="signupForm.name" ngxErrorMessage="Name" />
    <input [formField]="signupForm.email" ngxErrorMessage="Email" />
  `,
})
export class SignupComponent {
  model = signal({ name: '', email: '' })
  signupForm = form(this.model, (path) => {
    required(path.name)
    minLength(path.name, 3)
    required(path.email)
    email(path.email)
  })
}
```

## Cómo funciona

`[formField]` provee un `NgControl` de compatibilidad (el `InteropNgControl` propio de Angular) en el elemento host, así que `[ngxErrorMessage]` - que está escrito contra `NgControl` - lo detecta de forma transparente. Los signals `hasError`/`message` de la directiva se mantienen reactivos porque los getters `invalid`/`touched`/`errors` de esa capa de compatibilidad leen internamente los signals del field subyacente.

## Diferencias en las claves de error

Signal Forms reporta los errores de longitud como `minLength`/`maxLength` (camelCase), mientras que los Formularios Reactivos y los diccionarios propios de esta librería usan `minlength`/`maxlength`. `ngxErrorMessage` normaliza esto internamente, así que un mismo diccionario de `errorMessages`/traducción funciona para ambos sistemas de formularios - no necesitás claves separadas por tipo de formulario.

```json
{
  "validations": {
    "required": "{{fieldName}} is required.",
    "minlength": "The minimum allowed length is {{param}}.",
    "email": "It is not a valid email."
  }
}
```

`patternKey` y la auto-detección de patrones (ver [Patrones Personalizados](./custom-patterns)) funcionan igual, sin importar si el validador `pattern()` viene de `Validators.pattern` de Formularios Reactivos o del `pattern()` de Signal Forms.

## Validadores personalizados

Un validador personalizado de Signal Forms creado con `validate()` funciona igual que un [validador personalizado de Formularios Reactivos](./custom-validators) - devolvé un objeto con un `kind` y agregá el mensaje correspondiente a tu diccionario:

```typescript
validate(path.salary, (ctx) =>
  ctx.value().startsWith('00') ? { kind: 'avoidMultipleZero' } : undefined,
)
```

```json
{
  "validations": {
    "avoidMultipleZero": "Can't start with multiple zeros"
  }
}
```
