import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import {
  applyEach,
  disabled,
  email,
  form,
  FormField,
  maxLength,
  minLength,
  pattern,
  required,
  submit,
  validate,
} from '@angular/forms/signals'
import { JsonPipe } from '@angular/common'
import { TranslatePipe } from '@ngx-translate/core'

import { NgxErrorMessageDirective, regEx } from 'ngx-error-message'

interface SignupModel {
  name: {
    firstName: string
    lastName: string
  }
  username: string
  password: string
  email: string
  salary: string
  aliases: string[]
}

@Component({
  selector: 'app-signal-forms',
  templateUrl: './signal-forms.component.html',
  styleUrl: './signal-forms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormField, NgxErrorMessageDirective, JsonPipe, TranslatePipe],
})
export class SignalFormsComponent {
  formValue: unknown
  readonly checkbox = signal(true)

  readonly model = signal<SignupModel>({
    name: { firstName: '', lastName: '' },
    username: '',
    password: '',
    email: '',
    salary: '',
    aliases: [''],
  })

  readonly signupForm = form(this.model, (path) => {
    required(path.name.firstName)
    pattern(path.name.firstName, regEx.alphabet)
    required(path.name.lastName)
    pattern(path.name.lastName, regEx.alphabet)

    required(path.username)
    maxLength(path.username, 50)
    pattern(path.username, /^[a-zA-Z0-9.]+$/)
    disabled(path.username, { when: () => !this.checkbox() })

    required(path.password)
    minLength(path.password, 6)
    maxLength(path.password, 50)
    pattern(path.password, regEx.alphaNumeric)

    required(path.email)
    email(path.email)

    pattern(path.salary, regEx.numeric)
    validate(path.salary, (ctx) =>
      ctx.value().startsWith('00') ? { kind: 'avoidMultipleZero' } : undefined,
    )

    applyEach(path.aliases, (alias) => {
      required(alias)
      pattern(alias, regEx.alphaNumeric)
    })
  })

  addAlias(): void {
    this.model.update((value) => ({
      ...value,
      aliases: [...value.aliases, ''],
    }))
  }

  async onSubmit(): Promise<void> {
    await submit(this.signupForm, async (field) => {
      this.formValue = field().value()
    })
  }
}
