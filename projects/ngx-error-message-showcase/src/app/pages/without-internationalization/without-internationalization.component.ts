import { Component, inject } from '@angular/core'
import {
  FormGroup,
  FormBuilder,
  Validators,
  UntypedFormArray,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms'
import {
  Observable,
  catchError,
  delay,
  distinctUntilChanged,
  map,
  of,
} from 'rxjs'

import {
  regEx,
} from 'projects/ngx-error-message/src/public-api'

@Component({
  selector: 'app-without-internationalization',
  templateUrl: './without-internationalization.component.html',
  styleUrl: './without-internationalization.component.scss',
})
export class WithoutInternationalizationComponent {
  form!: FormGroup
  formValue: unknown
  #fb = inject(FormBuilder)

  ngOnInit(): void {
    this.form = this.#fb.group({
      name: this.#fb.group({
        firstName: [
          '',
          [Validators.required, Validators.pattern(regEx.alphabet)],
        ],
        lastName: [
          '',
          [Validators.required, Validators.pattern(regEx.alphabet)],
        ],
      }),
      username: [
        '',
        {
          validators: [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern('^[a-zA-Z0-9.]+$'),
          ],
          asyncValidators: [this.usernameValidator],
          updateOn: 'blur',
        },
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
          Validators.pattern(regEx.alphaNumeric),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', [Validators.pattern(regEx.numeric), this.avoidMultipleZero]],
      aliases: this.#fb.array([
        this.#fb.control('', [
          Validators.required,
          Validators.pattern(regEx.alphaNumeric),
        ]),
      ]),
    })

    // Only for delete form value is invalid
    this.form.statusChanges.pipe(distinctUntilChanged()).subscribe((status) => {
      if (status === 'INVALID') {
        this.formValue = null
      }
    })
  }

  get formControls() {
    return this.form.controls
  }

  get nameControls() {
    return (this.formControls['name'] as FormGroup).controls
  }

  get aliases() {
    return this.formControls['aliases'] as UntypedFormArray
  }

  addAlias() {
    this.aliases.push(
      this.#fb.control('', [
        Validators.required,
        Validators.pattern(regEx.alphaNumeric),
      ]),
    )
  }

  // Custom validators
  avoidMultipleZero(control: AbstractControl): ValidationErrors | null {
    const value = control.value
    const isZeros = value ? value.startsWith('00') : false
    return isZeros ? { avoidMultipleZero: true } : null
  }

  usernameValidator(
    control: AbstractControl,
  ): Observable<ValidationErrors | null> {
    if (!control.value) {
      return of(null)
    }

    // Simulate an HTTP call
    return of(control.value).pipe(
      delay(1000),
      map((value) => (value === 'test' ? { usernameTaken: true } : null)),
      catchError(() => of(null)),
    )
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    this.formValue = this.form.value
  }
}
