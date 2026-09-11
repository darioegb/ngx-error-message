---
id: configuration
title: Configuration
sidebar_position: 3
---

# Configuration

Both `provideNgxErrorMessage()` and `NgxErrorMessageModule.forRoot()` accept the same `ErrorMessageConfig` object:

```typescript
interface ErrorMessageConfig {
  validationsPrefix?: string
  patternsPrefix?: string
  errorMessages?: Record<string, string | Record<string, string>>
  errorPriority?: string[]
}
```

## With internationalization

When `@ngx-translate` is set up, the library reads messages from your translation JSON files instead of `errorMessages`. Create a file per language — for example `assets/i18n/en.json` — with a top-level key matching `validationsPrefix` (default: `validations`):

```json
{
  "validations": {
    "required": "The field is required.",
    "maxlength": "The maximum length allowed is {{param}}.",
    "minlength": "The minimum allowed length is {{param}}.",
    "email": "It is not a valid email.",
    "min": "The minimum allowed is {{param}}.",
    "max": "The maximum allowed is {{param}}.",
    "pattern": {
      "numeric": "The valid format is numeric.",
      "alphabet": "The valid format is alphabetical.",
      "smallLetters": "The valid format is lowercase letters.",
      "capitalLetters": "The valid format is capital letters.",
      "alphaNumeric": "The valid format is alphanumeric.",
      "phoneNumber": "Invalid phone number.",
      "websiteUrl": "Invalid website URL.",
      "ip": "Invalid IP address."
    }
  }
}
```

Each key matches an Angular validator error name — for example, a control with `Validators.required` produces `control.errors = { required: true }`, and the library looks up `validations.required` for its message. Keep the key names and the `{{param}}` placeholder exactly as shown; renaming them breaks message resolution. See [Internationalization](./guides/i18n) for more detail.

## Without internationalization

Pass a matching object literal to `errorMessages` instead:

```typescript
errorMessages: {
  required: 'This field is required.',
  maxlength: 'The maximum allowed length is {{param}}.',
  minlength: 'The minimum allowed length is {{param}}.',
  email: 'This is not a valid email address.',
  min: 'The minimum allowed value is {{param}}.',
  max: 'The maximum allowed value is {{param}}.',
  pattern: {
    numeric: 'The valid format is numeric.',
    alphabet: 'The valid format is alphabetic.',
    smallLetters: 'The valid format is lowercase letters.',
    capitalLetters: 'The valid format is uppercase letters.',
    alphaNumeric: 'The valid format is alphanumeric.',
    phoneNumber: 'Invalid phone number.',
    websiteUrl: 'Invalid website URL.',
    ip: 'Invalid IP address.',
    custom: "The valid format is alphanumeric and '.' is allowed.",
  },
  avoidMultipleZero: 'It cannot start with multiple zeros.',
},
```

## Error priority

When a control fails more than one validator at once, `errorPriority` decides which error's message is shown. It defaults to `DEFAULT_ERROR_PRIORITY`, exported by the library:

```typescript
const DEFAULT_ERROR_PRIORITY = [
  'required',
  'email',
  'pattern',
  'minlength',
  'maxlength',
  'min',
  'max',
]
```

Errors outside that list fall back to whichever one the validators registered last on the control. Pass your own order to `withErrorMessageConfig()` (or `NgxErrorMessageModule.forRoot()`) to override it globally, or to the directive's `errorPriority` input to override it for a single field.

## Required styles

Add these classes to your global stylesheet — customize or drop the border/color rules as you like:

```css
.error-container {
  border: 1px solid red;
  color: red;
}

.error-message {
  color: red;
}
```

See [Custom Class Names](./guides/custom-classnames) to use different class names per directive instance.
