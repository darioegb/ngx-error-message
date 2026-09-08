---
id: custom-classnames
title: Nombres de Clases Personalizados
sidebar_position: 2
---

# Nombres de Clases Personalizados

Por defecto, la directiva usa las clases `error-container` y `error-message`. Sobrescribilas por instancia con el input `classNames`:

```html
<form [formGroup]="form">
  <div>
    <label for="email">Email</label>
    <input
      id="email"
      formControlName="email"
      ngxErrorMessage="Email"
      [classNames]="{ control: 'custom-error-container', message: 'custom-error-message' }"
    />
  </div>
</form>
```

Definí las clases correspondientes en tu hoja de estilos:

```css
.custom-error-container {
  border: 1px solid blue;
  color: blue;
}

.custom-error-message {
  color: blue;
}
```
