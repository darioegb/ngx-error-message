---
id: signal-forms
title: Signal Forms
sidebar_position: 6
---

# Signal Forms

Angular 22 introduces [Signal Forms](https://angular.dev/guide/forms/signals) (`@angular/forms/signals`) as a stable, signal-based alternative to Reactive and Template-driven Forms. `[ngxErrorMessage]` works on a native input bound with `[formField]`, exactly the same way it works with `formControlName` or `ngModel` — no extra setup, no secondary entry point, no new peer dependency.

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

## How it works

`[formField]` provides a compatibility `NgControl` (Angular's own `InteropNgControl`) on the host element, so `[ngxErrorMessage]` — which is written against `NgControl` — picks it up transparently. The directive's `hasError`/`message` signals stay reactive because that compatibility layer's `invalid`/`touched`/`errors` getters read the underlying field signals internally.

## Error key differences

Signal Forms reports length errors as `minLength`/`maxLength` (camelCase), while Reactive Forms and this library's own dictionaries use `minlength`/`maxlength`. `ngxErrorMessage` normalizes this internally, so a single `errorMessages`/translation dictionary works for both form systems — you don't need separate keys per form type.

```json
{
  "validations": {
    "required": "{{fieldName}} is required.",
    "minlength": "The minimum allowed length is {{param}}.",
    "email": "It is not a valid email."
  }
}
```

`patternKey` and pattern auto-detection (see [Custom Patterns](./custom-patterns)) work the same way, whether the `pattern()` validator comes from Reactive Forms' `Validators.pattern` or Signal Forms' `pattern()`.

## Custom validators

A custom Signal Forms validator built with `validate()` works the same way as a [custom Reactive Forms validator](./custom-validators) — return an object with a `kind` and add the matching message to your dictionary:

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
