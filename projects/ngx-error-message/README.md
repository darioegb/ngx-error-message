# NgxErrorMessage

## Overview

NgxErrorMessage is an Angular library that displays dynamic error messages for reactive or template-driven forms, with optional internationalization support using `@ngx-translate`.

### Live Example

- [Live Example on StackBlitz](https://stackblitz.com/edit/ngx-error-message-example)

### Installation

```bash
npm install ngx-error-message --save
# Optional for translations:
npm install @ngx-translate/core @ngx-translate/http-loader --save
```

### Quick Setup

1. Import `NgxErrorMessageModule` in your main module and configure `@ngx-translate` if you want multilingual support.
2. Add error messages to your translation files (`assets/i18n/en.json`).
3. Use the directive in your form fields:

```html
<input formControlName="password" ngxErrorMessage />
```

### Customization

- Customize error messages globally or per field.
- Use the `classNames` attribute for custom styles.
- Control when to show errors with the `when` attribute.
- Easily add custom patterns and validations.

### Documentation

See the [official documentation](https://github.com/darioegb/ngx-error-message) for advanced examples, detailed setup, and customization.

---

> Github [@darioegb](https://github.com/darioegb)
