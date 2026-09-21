---
id: accessibility
title: Accessibility
sidebar_position: 7
---

# Accessibility

`[ngxErrorMessage]` sets two ARIA attributes on its host input automatically — no configuration needed, and they work the same way for [Reactive, template-driven, and Signal Forms](./signal-forms).

```html
<input formControlName="email" ngxErrorMessage="Email" />
```

While the control is valid, or before the error message is showing (per the [`when`](./conditional-display) condition), the input renders with no extra attributes. Once the error message is showing, the directive adds:

```html
<input
  formControlName="email"
  ngxErrorMessage="Email"
  aria-invalid="true"
  aria-describedby="ngx-error-message-0"
/>
<small id="ngx-error-message-0" class="error-message">Email is required.</small>
```

- `aria-invalid="true"` tells assistive technology the field currently fails validation. It's removed (not set to `"false"`) once the error clears, matching how most screen readers expect the attribute to be used.
- `aria-describedby` points at the generated `<small>` element's `id`, so a screen reader announces the error message together with the input's label when the field receives focus, instead of only reading the `aria-live` message separately.

The `id` is generated once per directive instance and is stable across renders, so the association doesn't break as the message updates (e.g. the control goes from `required` to `email` invalid without ever becoming valid in between).

Both attributes are driven by the same `hasError()` state used to render the message, so they always stay in sync with what's on screen — there's nothing extra to wire up.
