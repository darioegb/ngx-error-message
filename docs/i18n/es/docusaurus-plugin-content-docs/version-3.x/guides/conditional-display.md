---
id: conditional-display
title: Visualización Condicional
sidebar_position: 3
---

# Visualización Condicional

Por defecto, un mensaje de error se muestra cuando el control está `invalid` y `touched`. Sobrescribí esto con el input `when`, que acepta un único `ErrorWhenType` o un arreglo de ellos.

```html
<form [formGroup]="form">
  <div>
    <label for="email">Email</label>
    <input
      id="email"
      formControlName="email"
      ngxErrorMessage="Email"
      [when]="['dirty', 'touched']"
    />
  </div>
</form>
```

```typescript
type ErrorWhenType = 'dirty' | 'invalid' | 'pristine' | 'touched' | 'untouched'
```
