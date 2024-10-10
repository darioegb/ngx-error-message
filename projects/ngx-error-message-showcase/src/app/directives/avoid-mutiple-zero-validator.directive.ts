import { Directive } from '@angular/core'
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms'

@Directive({
  selector: '[avoidMultipleZero]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: AvoidMultipleZeroValidatorDirective,
      multi: true,
    },
  ],
})
export class AvoidMultipleZeroValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value
    const isZeros = value ? value.startsWith('00') : false
    return isZeros ? { avoidMultipleZero: true } : null
  }
}
