---
id: custom-patterns
title: Custom Patterns
sidebar_position: 4
---

# Custom Patterns

If none of the built-in patterns fit, add your own. Define the regex:

```javascript
const customPattern = /^[a-zA-Z0-9.]+$/
```

Add a matching error message under `pattern` in your translation file (or `errorMessages` object):

```json
{
  "validations": {
    "pattern": {
      "customPattern": "The valid format is alphanumeric and the '.' is allowed"
    }
  }
}
```

Point the directive at it with `patternKey`:

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
