---
id: custom-classnames
title: Custom Class Names
sidebar_position: 2
---

# Custom Class Names

By default, the directive uses the `error-container` and `error-message` classes. Override them per instance with the `classNames` input:

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

Define the matching classes in your stylesheet:

```css
.custom-error-container {
  border: 1px solid blue;
  color: blue;
}

.custom-error-message {
  color: blue;
}
```
