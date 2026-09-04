---
id: custom-validators
title: Validadores Personalizados
sidebar_position: 5
---

# Validadores Personalizados

Cualquier validador que asigne su propia clave de error al control funciona igual que uno incorporado. Por ejemplo, un validador que rechaza valores que empiezan con múltiples ceros:

```typescript
avoidMultipleZero(control: AbstractControl) {
  const value = control.value
  const isZeros = value ? value.startsWith('00') : false
  return isZeros ? { avoidMultipleZero: true } : null
}
```

Agregalo al control junto con los demás validadores:

```typescript
ngOnInit() {
  this.form = this.fb.group({
    salary: [null, [Validators.pattern(regEx.numeric), this.avoidMultipleZero]],
  })
}
```

Y agregá el mensaje correspondiente:

```json
{
  "validations": {
    "avoidMultipleZero": "Can't start with multiple zeros"
  }
}
```
