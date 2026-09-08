---
id: custom-patterns
title: Patrones Personalizados
sidebar_position: 4
---

# Patrones Personalizados

Si ninguno de los patrones incorporados se ajusta a tu caso, agregá el tuyo. Definí el regex:

```javascript
const customPattern = /^[a-zA-Z0-9.]+$/
```

Agregá el mensaje de error correspondiente bajo `pattern` en tu archivo de traducción (u objeto `errorMessages`):

```json
{
  "validations": {
    "pattern": {
      "customPattern": "The valid format is alphanumeric and the '.' is allowed"
    }
  }
}
```

Apuntá la directiva a ese patrón con `patternKey`:

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
