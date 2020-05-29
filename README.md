# NgxErrorMessage

## Features
 - Dynamic component display error for inpunt fields in reactive form dynamically.

## Dependencies
Latest version available for each version of Angular

## Features
 - Dynamic component display error for inpunt fields in reactive form dynamically.

## Dependencies
Latest version available for each version of Angular

| ngx-error-message | Angular     |
|-------------------|-------------|
| 1.2.0             | 9.x 8.x 7.x |

## Install

```bash
  npm install ngx-error-message --save
```

`@ngx-translate` package is a required dependency

```bash
  npm install @ngx-translate/core --save
  npm install @ngx-translate/http-loader --save
```
Follows this link for more information about ngx-translate:
https://github.com/ngx-translate/core

## Setup

**step 1:** Add NgxErrorMessageModule to appModule, make sure you have configured ngx-translate as well

```typescript
  import { BrowserModule } from '@angular/platform-browser';
  import { HttpClientModule, HttpClient } from '@angular/common/http';
  import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
  import { TranslateHttpLoader } from '@ngx-translate/http-loader';

  import { NgxErrorMessageModule } from 'ngx-error-message';

  // part of configuration ngx translate loader function
  export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http); // make sure your assets files are in default assets/i18n/*
  }

  @NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      BrowserModule,
      HttpClientModule, // required module for ngx-translate
      // required ngx-translate module
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        useDefaultLang: true,
        loader: {
          provide: TranslateLoader,
          useFactory: (HttpLoaderFactory),
          deps: [HttpClient]
        }
      }),
      NgxErrorMessageModule //NgxErrorMessageModule added
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  class MainModule {}
```

**step  2**
**Add error message configuration in JSON file**
 Ngx-translate and others internationalizations packages manage json files for each idiom thant manage. For example is your application manage english langague you must create in assets/i18n/en.json, in the file you will have all the errors you need in your application. Every property in the json will be named as the error displayed by the form (using reactive forms), for example, when a field has an error you can write form.get('field').errors and receive the error object, by example:
```javascript
  // form.get('field').errors
  // The field is required and displays the error
  { 
      required: true
  }
  // The field must be an email
  { 
      email: true
  }
  // The field must be numeric and 5 as maximum length 
  { 
      required: true,
      maxlength: true
  }
```
Then, if you want to display a message for each error, our json file needs to look like this:
```javascript
  // assets/i18n/en.json
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
            "ip": "The IP address is not correct."
        }
    }
  }
```
You must respect all key names and the name of the param variable.
If you change some of these keys, the library does not work for you to change.

**step 3**
Add This class in your styles.css file. You feel free to customization, or ignore the border or color style. In all case dont change the class name.

```css
.error-container {
    border: 1px solid red;
    color: red;
}
```

## Use

After configuration you can used the directive as follow example
```html
  <input type="password" formControlName="password" placeholder="Password" class="form-control">
  <!-- Example to use directive default example  -->
  <ng-template ngxErrorMessage [control]="formControls.password"></ng-template>
```

```typescript
import { regEx } from 'ngx-error-message';//Important import to use pattern validations created in library


ngOnInit() {
  this.form = this.fb.group({
      // others formControls
    password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(regEx.alphaNumeric)]]
  });
}
//  Easy trick for get formControls in html and in typescript
get formControls() { return this.form.controls; }
```
The control parameter for this directive is obligatory. Also you can add optional parameter **patternKey** it recive the name of custom pattern does not cover in default validations.

## Patterns validations created in libary
```javascript
export const regEx = {
    phoneNumber: '(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})',
    websiteUrl: '^(https?:\/\/)?([\w\d-_]+)\.([\w\d-_\.]+)\/?\??([^#\n\r]*)?#?([^\n\r]*)',
    numeric: '^\d+$',
    smallLetters: '^[a-z]+$',
    capitalLetters: '^[A-Z]+$',
    alphabet: '^[a-zA-Z\s]+$',
    alphaNumeric: '^[a-zA-Z0-9\s]+$',
    ip: '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$'
};
``` 
You can use these patterns if you like in your formControl in the pattern validator by importing the RegEx constant and use it as the example described above.

## Directive Inputs

| Input      | Required | Description                             |
|------------|----------|-----------------------------------------|
| control    | true     | FormControl object                      |
| patternKey | false    | Pattern name as you called in json file |

## Customization validations

### New validation pattern

If we need to add a new validation pattern, that default validation does not cover it, you must add your pattern in some constant for example:
```javascript
custom = /^[a-zA-Z0-9.]+$/

ngOnInit() {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.maxLength(50), Validators.pattern(custom)]]
    });
  }
```
After that you must add new validation pattern inside the object with key as a pattern.

```json
  "validations": {
      "pattern": {
          "custom": "The valid format is alphanumeric and the '.' is allowed"
      }
  }
```

In your html file add the patternKey atribute to directive

```html
   <input type="text" formControlName="username" placeholder="Username" class="form-control">
  <ng-template ngxErrorMessage [control]="formControls.username" patternKey="custom"></ng-template>
```

### new custom validation

If we need to add new custom validator just create the validator function o set error in formControl. For example if some avoidMultipleZero in input code follow the next structure.

```javascript
  // Custom validator
  avoidMultipleZero(control: AbstractControl) {
      const value = control.value;
      const isZeros = (value) ? value.startsWith('00') : false;
      return isZeros ? { avoidMultipleZero: true } : null; //return boolean y error exist
  }

  ngOnInit() {
    this.form = this.fb.group({
        // others formControls
        salary: [null, [Validators.pattern(regEx.numeric), this.avoidMultipleZero]]
    });
  }
```
After add to languaje file the message for this validation. Don't forget the validation message must named equal that validation error name.

```json
  "validations": {
      "avoidMultipleZero": "Can't start with multiple zeros"
  }
```

## Test

Ngx-toastf-showcase is the testing project. Use ng s to run it.

## License

MIT

---

> GitLab [@darioegb](https://gitlab.com/darioegb) &nbsp;&middot;&nbsp;