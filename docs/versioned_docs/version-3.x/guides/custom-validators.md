---
id: custom-validators
title: Custom Validators
sidebar_position: 5
---

# Custom Validators

Any validator that sets its own error key on the control works the same way as a built-in one. For example, a validator that rejects values starting with multiple zeros:

```typescript
avoidMultipleZero(control: AbstractControl) {
  const value = control.value
  const isZeros = value ? value.startsWith('00') : false
  return isZeros ? { avoidMultipleZero: true } : null
}
```

Add it to the control alongside any other validators:

```typescript
ngOnInit() {
  this.form = this.fb.group({
    salary: [null, [Validators.pattern(regEx.numeric), this.avoidMultipleZero]],
  })
}
```

Then add the corresponding message:

```json
{
  "validations": {
    "avoidMultipleZero": "Can't start with multiple zeros"
  }
}
```
