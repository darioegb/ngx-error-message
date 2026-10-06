// Builds the "Usage" code snippet for each demo page from the form's live value,
// so the shown code mirrors what the user has typed (values, alias count, enabled
// state) - mirroring the dynamic snippet of the ngx-toast showcase.

export interface DemoValue {
  name: { firstName: string; lastName: string }
  username: string
  password: string
  email: string
  salary: string
  aliases: string[]
}

/** Quotes a live field value as a single-quoted TS string literal. */
function q(value: string): string {
  return `'${String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")}'`
}

const header = (imports: string): string =>
  `// demo.component.ts
import { Component${imports} } from '@angular/core'`

export function buildReactiveUsage(
  v: DemoValue,
  usernameEnabled: boolean,
): string {
  const aliases = v.aliases
    .map(
      (a) =>
        `      this.fb.control(${q(a)}, [Validators.pattern(regEx.alphaNumeric)]),`,
    )
    .join('\n')

  return `<!-- demo.component.html -->
<form [formGroup]="form">
  <ng-container formGroupName="name">
    <input formControlName="firstName" [ngxErrorMessage]="'First name'" />
    <input formControlName="lastName" [ngxErrorMessage]="'Last name'" />
  </ng-container>
  <input formControlName="username" [ngxErrorMessage]="'Username'" />
  <input formControlName="password" [ngxErrorMessage]="'Password'" />
  <input formControlName="email" [ngxErrorMessage]="'Email'" />
  <input formControlName="salary" [ngxErrorMessage]="'Salary'" />
  <ng-container formArrayName="aliases">
    @for (control of aliases.controls; track $index) {
      <input [formControlName]="$index" [ngxErrorMessage]="'Alias'" />
    }
  </ng-container>
</form>

${header(', inject')}
import { FormArray, FormBuilder, Validators } from '@angular/forms'
import { regEx } from 'ngx-error-message'

export class DemoComponent {
  private readonly fb = inject(FormBuilder)

  form = this.fb.group({
    name: this.fb.group({
      firstName: [${q(v.name.firstName)}, [Validators.required, Validators.pattern(regEx.alphabet)]],
      lastName: [${q(v.name.lastName)}, [Validators.required, Validators.pattern(regEx.alphabet)]],
    }),
    username: [
      { value: ${q(v.username)}, disabled: ${!usernameEnabled} },
      [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9.]+$')],
    ],
    password: [${q(v.password)}, [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(regEx.alphaNumeric)]],
    email: [${q(v.email)}, [Validators.required, Validators.email]],
    salary: [${q(v.salary)}, [Validators.pattern(regEx.numeric)]],
    aliases: this.fb.array([
${aliases}
    ]),
  })

  get aliases(): FormArray {
    return this.form.get('aliases') as FormArray
  }
}`
}

export function buildWithoutI18nUsage(
  v: DemoValue,
  usernameEnabled: boolean,
): string {
  const aliases = v.aliases
    .map(
      (a) =>
        `      this.fb.control(${q(a)}, [Validators.pattern(regEx.alphaNumeric)]),`,
    )
    .join('\n')

  return `<!-- demo.component.html -->
<form [formGroup]="form">
  <ng-container formGroupName="name">
    <input formControlName="firstName" ngxErrorMessage />
    <input formControlName="lastName" ngxErrorMessage />
  </ng-container>
  <input formControlName="username" ngxErrorMessage />
  <input formControlName="password" ngxErrorMessage />
  <input formControlName="email" ngxErrorMessage />
  <input formControlName="salary" ngxErrorMessage />
  <ng-container formArrayName="aliases">
    @for (control of aliases.controls; track $index) {
      <input [formControlName]="$index" ngxErrorMessage />
    }
  </ng-container>
</form>

${header(', inject')}
import { FormArray, FormBuilder, Validators } from '@angular/forms'
import { regEx } from 'ngx-error-message'

export class DemoComponent {
  private readonly fb = inject(FormBuilder)

  form = this.fb.group({
    name: this.fb.group({
      firstName: [${q(v.name.firstName)}, [Validators.required, Validators.pattern(regEx.alphabet)]],
      lastName: [${q(v.name.lastName)}, [Validators.required, Validators.pattern(regEx.alphabet)]],
    }),
    username: [
      { value: ${q(v.username)}, disabled: ${!usernameEnabled} },
      [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9.]+$')],
    ],
    password: [${q(v.password)}, [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(regEx.alphaNumeric)]],
    email: [${q(v.email)}, [Validators.required, Validators.email]],
    salary: [${q(v.salary)}, [Validators.pattern(regEx.numeric)]],
    aliases: this.fb.array([
${aliases}
    ]),
  })

  get aliases(): FormArray {
    return this.form.get('aliases') as FormArray
  }
}`
}

export function buildTemplateDrivenUsage(
  v: DemoValue,
  usernameEnabled: boolean,
): string {
  const aliases = v.aliases.map(q).join(', ')

  return `<!-- demo.component.html -->
<form #form="ngForm">
  <input name="firstName" [(ngModel)]="model.name.firstName" required [pattern]="patterns.alphabet" [ngxErrorMessage]="'First name'" />
  <input name="lastName" [(ngModel)]="model.name.lastName" required [pattern]="patterns.alphabet" [ngxErrorMessage]="'Last name'" />
  <input name="username" [(ngModel)]="model.username" [disabled]="!checkbox" required maxlength="50" pattern="^[a-zA-Z0-9.]+$" [ngxErrorMessage]="'Username'" />
  <input name="password" [(ngModel)]="model.password" required minlength="6" maxlength="50" [pattern]="patterns.alphaNumeric" [ngxErrorMessage]="'Password'" />
  <input name="email" [(ngModel)]="model.email" required email [ngxErrorMessage]="'Email'" />
  <input name="salary" [(ngModel)]="model.salary" [pattern]="patterns.numeric" [ngxErrorMessage]="'Salary'" />
  @for (alias of model.aliases; track $index; let i = $index) {
    <input name="alias{{ i }}" [(ngModel)]="model.aliases[i]" required [pattern]="patterns.alphaNumeric" [ngxErrorMessage]="'Alias'" />
  }
</form>

${header('')}
import { FormsModule } from '@angular/forms'
import { regEx } from 'ngx-error-message'

export class DemoComponent {
  model = {
    name: { firstName: ${q(v.name.firstName)}, lastName: ${q(v.name.lastName)} },
    username: ${q(v.username)},
    password: ${q(v.password)},
    email: ${q(v.email)},
    salary: ${q(v.salary)},
    aliases: [${aliases}],
  }
  checkbox = ${usernameEnabled}
  patterns = regEx
}`
}

export function buildSignalUsage(
  v: DemoValue,
  usernameEnabled: boolean,
): string {
  const aliases = v.aliases.map(q).join(', ')

  return `<!-- demo.component.html -->
<input [formField]="signupForm.name.firstName" [ngxErrorMessage]="'First name'" />
<input [formField]="signupForm.name.lastName" [ngxErrorMessage]="'Last name'" />
<input [formField]="signupForm.username" [ngxErrorMessage]="'Username'" />
<input [formField]="signupForm.password" [ngxErrorMessage]="'Password'" />
<input [formField]="signupForm.email" [ngxErrorMessage]="'Email'" />
<input [formField]="signupForm.salary" [ngxErrorMessage]="'Salary'" />
@for (alias of signupForm.aliases; track $index) {
  <input [formField]="alias" [ngxErrorMessage]="'Alias'" />
}

${header('')}
import { signal } from '@angular/core'
import { form, maxLength, minLength, pattern, required } from '@angular/forms/signals'
import { regEx } from 'ngx-error-message'

export class DemoComponent {
  readonly checkbox = signal(${usernameEnabled})

  readonly model = signal({
    name: { firstName: ${q(v.name.firstName)}, lastName: ${q(v.name.lastName)} },
    username: ${q(v.username)},
    password: ${q(v.password)},
    email: ${q(v.email)},
    salary: ${q(v.salary)},
    aliases: [${aliases}],
  })

  readonly signupForm = form(this.model, (path) => {
    required(path.name.firstName)
    pattern(path.name.firstName, regEx.alphabet)
    required(path.name.lastName)
    pattern(path.name.lastName, regEx.alphabet)
    required(path.username)
    maxLength(path.username, 50)
    pattern(path.username, /^[a-zA-Z0-9.]+$/)
    required(path.password)
    minLength(path.password, 6)
    maxLength(path.password, 50)
    pattern(path.password, regEx.alphaNumeric)
    required(path.email)
    pattern(path.salary, regEx.numeric)
  })
}`
}
