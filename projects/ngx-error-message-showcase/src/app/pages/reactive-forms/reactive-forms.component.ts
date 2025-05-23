import { Component, inject } from '@angular/core'
import {
  FormGroup,
  FormBuilder,
  Validators,
  UntypedFormArray,
  AbstractControl,
  ValidationErrors,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'
import {
  Observable,
  catchError,
  delay,
  distinctUntilChanged,
  map,
  of,
} from 'rxjs'

import { regEx } from 'projects/ngx-error-message/src/public-api'
import { NgxErrorMessageDirective } from '../../../../../ngx-error-message/src/lib/ngx-error-message.directive'
import { SpinnerComponent } from '../../components/spinner/spinner.component'
import { JsonPipe } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxErrorMessageDirective,
    SpinnerComponent,
    JsonPipe,
    TranslateModule,
  ],
})
export class ReactiveFormsComponent {
  form!: FormGroup
  formValue: unknown
  checkbox = true
  private readonly fb = inject(FormBuilder)

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.group({
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
        { value: '', disabled: this.checkbox },
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
      aliases: this.fb.array([
        this.fb.control('', [Validators.pattern(regEx.alphaNumeric)]),
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
      this.fb.control('', [
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

  onChangeCheckbox() {
    this.checkbox
      ? this.formControls['username'].disable()
      : this.formControls['username'].enable()
    this.formControls['username'].markAsUntouched()
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    this.formValue = this.form.value
  }
}
