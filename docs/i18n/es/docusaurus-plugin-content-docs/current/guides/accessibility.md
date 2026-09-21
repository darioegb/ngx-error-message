---
id: accessibility
title: Accesibilidad
sidebar_position: 7
---

# Accesibilidad

`[ngxErrorMessage]` configura dos atributos ARIA en su input host automáticamente - sin necesidad de configuración, y funcionan igual para [Formularios Reactivos, template-driven y Signal Forms](./signal-forms).

```html
<input formControlName="email" ngxErrorMessage="Email" />
```

Mientras el control es válido, o antes de que se muestre el mensaje de error (según la condición [`when`](./conditional-display)), el input se renderiza sin atributos extra. Una vez que el mensaje de error se muestra, la directiva agrega:

```html
<input
  formControlName="email"
  ngxErrorMessage="Email"
  aria-invalid="true"
  aria-describedby="ngx-error-message-0"
/>
<small id="ngx-error-message-0" class="error-message">Email is required.</small>
```

- `aria-invalid="true"` le indica a la tecnología asistiva que el campo actualmente falla la validación. Se elimina (no se pone en `"false"`) una vez que el error se limpia, siguiendo la forma en que la mayoría de los lectores de pantalla esperan que se use este atributo.
- `aria-describedby` apunta al `id` del elemento `<small>` generado, así un lector de pantalla anuncia el mensaje de error junto con el label del input cuando el campo recibe foco, en vez de solo leer el mensaje de la región `aria-live` por separado.

El `id` se genera una vez por instancia de la directiva y es estable entre renders, así que la asociación no se rompe a medida que el mensaje se actualiza (por ejemplo, cuando el control pasa de estar inválido por `required` a estarlo por `email` sin llegar a ser válido en el medio).

Ambos atributos están controlados por el mismo estado `hasError()` usado para renderizar el mensaje, así que siempre se mantienen sincronizados con lo que se ve en pantalla - no hay nada extra que conectar.
