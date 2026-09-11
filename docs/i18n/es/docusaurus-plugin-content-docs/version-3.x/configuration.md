---
id: configuration
title: Configuración
sidebar_position: 3
---

# Configuración

Tanto `provideNgxErrorMessage()` como `NgxErrorMessageModule.forRoot()` aceptan el mismo objeto `ErrorMessageConfig`:

```typescript
interface ErrorMessageConfig {
  validationsPrefix?: string
  patternsPrefix?: string
  errorMessages?: Record<string, string | Record<string, string>>
}
```

## Con internacionalización

Cuando `@ngx-translate` está configurado, la librería lee los mensajes desde tus archivos JSON de traducción en lugar de `errorMessages`. Creá un archivo por idioma — por ejemplo `assets/i18n/en.json` — con una clave de nivel superior que coincida con `validationsPrefix` (por defecto: `validations`):

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

Cada clave coincide con el nombre de un error de validador de Angular — por ejemplo, un control con `Validators.required` produce `control.errors = { required: true }`, y la librería busca `validations.required` para su mensaje. Mantené los nombres de las claves y el placeholder `{{param}}` exactamente como se muestran; renombrarlos rompe la resolución de mensajes. Ver [Internacionalización](./guides/i18n) para más detalle.

## Sin internacionalización

Pasá un objeto equivalente a `errorMessages`:

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

## Estilos requeridos

Agregá estas clases a tu hoja de estilos global — personalizá o quitá las reglas de borde/color como prefieras:

```css
.error-container {
  border: 1px solid red;
  color: red;
}

.error-message {
  color: red;
}
```

Ver [Nombres de Clases Personalizados](./guides/custom-classnames) para usar nombres de clase distintos por instancia de la directiva.
