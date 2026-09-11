import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideZonelessChangeDetection } from '@angular/core'
import {
  Component,
  ChangeDetectionStrategy,
  inject as inject_1,
} from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'

import { NgxErrorMessageDirective } from '../public-api'
import { provideNgxErrorMessage, withErrorMessageConfig } from '../public-api'
import { ENGLISH_TRANSLATIONS } from '@testing/translations'

@Component({
  template: `<form [formGroup]="form" class="form-horizontal">
    <div class="form-group col-lg-10">
      <input
        type="email"
        formControlName="email"
        placeholder="Email"
        class="form-control"
        ngxErrorMessage
      />
    </div>
    <div class="form-group col-lg-10">
      <input
        type="text"
        formControlName="user"
        placeholder="User"
        class="form-control"
        ngxErrorMessage
        [when]="'invalid'"
      />
    </div>
  </form>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, NgxErrorMessageDirective],
})
class TestHostComponent {
  private readonly fb = inject_1(FormBuilder)

  form: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    user: [null, Validators.required],
  })
}

describe('NgxErrorMessageDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let component: TestHostComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TestHostComponent],
      providers: [
        FormBuilder,
        provideNgxErrorMessage(
          withErrorMessageConfig({
            errorMessages: ENGLISH_TRANSLATIONS.validations,
          }),
        ),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render the message once the control is touched and invalid', () => {
    const control = component.form.controls['email']
    control.markAsTouched()
    fixture.detectChanges()

    const message = (fixture.nativeElement as HTMLElement).querySelector(
      'small.error-message',
    )
    expect(message?.textContent).toBe(ENGLISH_TRANSLATIONS.validations.required)
  })

  it('should not render a message for a field before it is touched', () => {
    const emailBlock = (fixture.nativeElement as HTMLElement).querySelector(
      '.form-group',
    )!
    expect(emailBlock.querySelector('small.error-message')).toBeNull()
  })

  it('should toggle the error-container class on its own host element, not a walked sibling', () => {
    const input = (fixture.nativeElement as HTMLElement).querySelector(
      'input[formcontrolname="email"]',
    )!
    const control = component.form.controls['email']

    expect(input.classList.contains('error-container')).toBe(false)

    control.markAsTouched()
    fixture.detectChanges()
    expect(input.classList.contains('error-container')).toBe(true)

    control.setValue('test@example.com')
    fixture.detectChanges()
    expect(input.classList.contains('error-container')).toBe(false)
  })

  it('should update the message when the error changes, without recreating the presenter element', () => {
    const emailBlock = (fixture.nativeElement as HTMLElement).querySelector(
      '.form-group',
    )!
    const control = component.form.controls['email']
    control.markAsTouched()
    fixture.detectChanges()

    const messageBefore = emailBlock.querySelector('small.error-message')
    expect(messageBefore?.textContent).toBe(
      ENGLISH_TRANSLATIONS.validations.required,
    )

    control.setValue('not-an-email')
    fixture.detectChanges()

    const messageAfter = emailBlock.querySelector('small.error-message')
    expect(messageAfter).toBe(messageBefore)
    expect(messageAfter?.textContent).toBe(
      ENGLISH_TRANSLATIONS.validations.email,
    )
  })

  it('should honor a single-condition `when` input instead of the default array', () => {
    const control = component.form.controls['user']
    // `when="invalid"` alone (no `touched` requirement): the message must
    // show up as soon as the control is invalid, before it's touched.
    fixture.detectChanges()

    const inputs = (fixture.nativeElement as HTMLElement).querySelectorAll(
      'small.error-message',
    )
    expect(inputs.length).toBe(1)
    expect(control.touched).toBe(false)
  })
})

describe('NgxErrorMessageDirective without a translator or dictionary configured', () => {
  it('should not throw and should render an empty message', async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TestHostComponent],
      providers: [FormBuilder, provideNgxErrorMessage()],
    }).compileComponents()

    const fixture = TestBed.createComponent(TestHostComponent)
    const component = fixture.componentInstance
    expect(() => fixture.detectChanges()).not.toThrow()

    component.form.controls['email'].markAsTouched()
    expect(() => fixture.detectChanges()).not.toThrow()
    // No dictionary and no translator configured: there's nothing to show,
    // so the presenter renders nothing at all (not an empty bubble).
    expect(
      (fixture.nativeElement as HTMLElement).querySelector(
        'small.error-message',
      ),
    ).toBeNull()
  })
})

describe('NgxErrorMessageDirective under zoneless change detection', () => {
  it('should render the message after a signal-driven change with no zone.js involved', async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TestHostComponent],
      providers: [
        FormBuilder,
        provideZonelessChangeDetection(),
        provideNgxErrorMessage(
          withErrorMessageConfig({
            errorMessages: ENGLISH_TRANSLATIONS.validations,
          }),
        ),
      ],
    }).compileComponents()

    const fixture = TestBed.createComponent(TestHostComponent)
    const component = fixture.componentInstance
    await fixture.whenStable()

    component.form.controls['email'].markAsTouched()
    await fixture.whenStable()

    expect(
      (fixture.nativeElement as HTMLElement).querySelector(
        'small.error-message',
      )?.textContent,
    ).toBe(ENGLISH_TRANSLATIONS.validations.required)
  })
})
