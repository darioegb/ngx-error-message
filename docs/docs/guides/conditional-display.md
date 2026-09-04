---
id: conditional-display
title: Conditional Display
sidebar_position: 3
---

# Conditional Display

By default, an error message is shown when the control is `invalid` and `touched`. Override this with the `when` input, which accepts a single `ErrorWhenType` or an array of them.

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
