# NgxErrorMessage

![pipeline status](https://github.com/darioegb/ngx-error-message/actions/workflows/ci.yml/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=darioegb_ngx-error-message&metric=alert_status)](https://sonarcloud.io/dashboard?id=darioegb_ngx-error-message)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=darioegb_ngx-error-message&metric=coverage)](https://sonarcloud.io/dashboard?id=darioegb_ngx-error-message)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=darioegb_ngx-error-message&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=darioegb_ngx-error-message)

## Features

- Dynamic directive that display error for input fields in reactive or template driven form dynamically.

## Dependencies

Latest version available for each version of Angular

| ngx-error-message | Angular      |
| ----------------- | ------------ |
| 3.0.1             | 14.x to 18.x |
| 3.0.0             | 14.x to 18.x |
| 2.2.1             | 10.x to 14.x |
| 2.2.0             | 10.x to 14.x |
| 2.1.0             | 9.x to 13.x  |
| 2.0.1             | 8.x to 11.x  |
| 2.0.0             | 8.x to 11.x  |
| 1.3.0             | 9.x 8.x 7.x  |

## Live Example

You can check how this library works in the following link, on a live example:
[ngx-error-message-example](https://stackblitz.com/edit/ngx-error-message-example)

## Installation

```bash
npm install ngx-error-message --save
```

The `@ngx-translate` package is an optional dependency if you wish to use translations. Install it using the following commands:

```bash
npm install @ngx-translate/core --save
npm install @ngx-translate/http-loader --save
```

For more information about ngx-translate, refer to the [ngx-translate GitHub repository](https://github.com/ngx-translate/core).

## Setup

**Step 1:**
Add `NgxErrorMessageModule` to your app module. Make sure you have also configured ngx-translate. This module allows you to configure custom error messages for forms. You can configure the module globally using forRoot or in specific modules using forChild.

### Global Default configuration

```typescript
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

// Part of configuration ngx-translate loader function
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http) // Make sure your assets files are in default assets/i18n/*
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Required module for ngx-translate
    // Required ngx-translate module
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxErrorMessageModule.forRoot(), // NgxErrorMessageModule added default config
    // other modules...
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### Global configuration with custom validationsPrefix and patternPrefix names

```typescript
  // Same as above the rest of the config
  NgxErrorMessageModule.forRoot({
    validationsPrefix: 'VALIDATIONS',
    patternsPrefix: 'PATTERNS',
  }),
```

### Global configuration without internationalization

```typescript
  // Same as above the rest of the config. But omit the part related to TranslateModule
  NgxErrorMessageModule.forRoot({
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
  }),
```

**Step 2:**
Add the error message settings in the JSON file. Ngx-translate and other internationalization packages manage JSON files for each language used in the application. For example, if your application manages the English language, you must create it in `assets/i18n/en.json`. In this file, you will have all the errors you need. Each property in the JSON will be named as the error displayed by the form (using reactive forms). For example, when a field has an error, you can access the error object using `form.get('field').errors`. The error object will have the following structure:

```javascript
{
  required: true
}
```

To display a message for each error, your JSON file should look like this:

```javascript
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

Make sure to respect all key names and the name of the `param` variable. Changing these keys may cause the library to not work as expected.

**Step 3:**
Add the following classes to your `styles.css` file. You can customize these styles or ignore the border and color styles.

```css
.error-container {
  border: 1px solid red;
  color: red;
}

.error-message {
  color: red;
}
```

## Usage

After the configuration, you can use the directive as shown in the following example:

```html
<!-- Example of using the directive -->
<input
  type="password"
  formControlName="password"
  placeholder="Password"
  class="form-control"
  ngxErrorMessage
/>
```

```typescript
import { regEx } from 'ngx-error-message'; // Important import to use pattern validations created in the library

ngOnInit() {
  this.form = this.fb.group({
    // Other form controls
    password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(regEx.alphaNumeric)]]
  });
}

// Easy trick to get form controls in HTML and TypeScript
get formControls() { return this.form.controls; }
```

You can enhance the functionality of the directive by including optional parameters:

- `classNames`: CSS classes for the error container and message.
- `patternKey`: Pattern key for custom validations.
- `when`: Conditions under which the error message is shown.

## Customization

### Custom error message styles

To customize the error message styles in the NgxErrorMessageDirective, you can use the classNames attribute. This attribute allows you to specify custom CSS classes for the error container and the error message. By default, the directive uses the classes error-container and error-message.

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

In this example, the custom classes custom-error-container and custom-error-message are used instead of the default classes. You can define these classes in your `styles.css`
file:

```css
.custom-error-container {
  border: 1px solid blue;
  color: blue;
}

.custom-error-message {
  color: blue;
}
```

### Custom conditions for showing error messages

The `when` attribute allows you to specify custom conditions under which the error message is shown. This attribute can accept a ErrorWhenType or an array of ErrorWhenType. By default, the error message is shown when the form control is invalid and touched. You can customize this behavior by providing specific conditions.

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

The ErrorWhenType type:

```typescript
type ErrorWhenType = 'dirty' | 'invalid' | 'pristine' | 'touched' | 'untouched'
```

### Adding a New Validation Pattern

If you need to add a new validation pattern that is not covered by the default validations, you can add your pattern to a constant. For example:

```javascript
const customPattern = /^[a-zA-Z0-9.]+$/
```

After adding the pattern, you need to include it in the JSON file with a corresponding error message:

```javascript
{
  "validations": {
    "pattern": {
      "customPattern": "The valid format is alphanumeric and the '.' is allowed"
    }
  }
}
```

In your HTML file, add the `patternKey` attribute to the directive:

```html
<input
  type="text"
  formControlName="username"
  placeholder="Username"
  class="form-control"
  ngxErrorMessage
  patternKey="customPattern"
/>
```

### Adding a Custom Validation

To add a custom validator, create a validator function or set an error in the form control. For example, if you want to avoid multiple zeros in an input field, you can create the following validator function:

```javascript
avoidMultipleZero(control: AbstractControl) {
  const value = control.value;
  const isZeros = value ? value.startsWith('00') : false;
  return isZeros ? { avoidMultipleZero: true } : null;
}
```

Then, add the validator to your form control:

```typescript
ngOnInit() {
  this.form = this.fb.group({
    // Other form controls
    salary: [null, [Validators.pattern(regEx.numeric), this.avoidMultipleZero]]
  });
}
```

Finally, add the error message for this validation in the JSON file:

```javascript
{
  "validations": {
    // Other validations
    "avoidMultipleZero": "Can't start with multiple zeros"
  }
}
```

## License

MIT

---

> Github [@darioegb](https://github.com/darioegb) &nbsp;&middot;&nbsp;
