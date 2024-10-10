import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms'
import { Observable, of } from 'rxjs'
import { map, catchError, delay } from 'rxjs/operators'

export function usernameValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null)
    }

    // Simulate an HTTP call
    return of(control.value).pipe(
      delay(2000),
      map((value) => (value === 'test' ? { usernameTaken: true } : null)),
      catchError(() => of(null)),
    )
  }
}
