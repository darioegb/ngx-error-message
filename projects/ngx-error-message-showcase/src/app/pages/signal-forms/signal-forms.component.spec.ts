import { TestBed, ComponentFixture } from '@angular/core/testing'
import { SignalFormsComponent } from './signal-forms.component'
import {
  provideTranslateService,
  provideTranslateLoader,
  TranslateNoOpLoader,
} from '@ngx-translate/core'
import {
  NgxErrorMessageDirective,
  provideNgxErrorMessage,
} from 'ngx-error-message'

describe('SignalFormsComponent', () => {
  let component: SignalFormsComponent
  let fixture: ComponentFixture<SignalFormsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalFormsComponent, NgxErrorMessageDirective],
      providers: [
        provideTranslateService({
          loader: provideTranslateLoader(TranslateNoOpLoader),
        }),
        provideNgxErrorMessage(),
      ],
    }).compileComponents()

    fixture = TestBed.createComponent(SignalFormsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should mark the form as invalid while required fields are empty', () => {
    expect(component.signupForm().invalid()).toBe(true)
  })

  it('should mark the form as valid once every field satisfies its validators', () => {
    component.signupForm.name.firstName().value.set('John')
    component.signupForm.name.lastName().value.set('Doe')
    component.signupForm.username().value.set('johndoe')
    component.signupForm.password().value.set('password123')
    component.signupForm.email().value.set('john.doe@example.com')
    component.signupForm.aliases[0]().value.set('johnny')
    fixture.detectChanges()

    expect(component.signupForm().valid()).toBe(true)
  })

  it('should submit and expose the model value once the form is valid', async () => {
    component.signupForm.name.firstName().value.set('John')
    component.signupForm.name.lastName().value.set('Doe')
    component.signupForm.username().value.set('johndoe')
    component.signupForm.password().value.set('password123')
    component.signupForm.email().value.set('john.doe@example.com')
    component.signupForm.aliases[0]().value.set('johnny')
    fixture.detectChanges()

    await component.onSubmit()

    expect(component.formValue).toEqual(component.model())
  })

  it('should reject a salary starting with multiple zeros via the custom validator', () => {
    component.signupForm.salary().value.set('00123')
    fixture.detectChanges()

    expect(component.signupForm.salary().invalid()).toBe(true)
  })

  it('should add a new, initially-required alias field', () => {
    const initialLength = component.model().aliases.length

    component.addAlias()
    fixture.detectChanges()

    expect(component.model().aliases.length).toBe(initialLength + 1)
    expect(component.signupForm.aliases[initialLength]().invalid()).toBe(true)
  })
})
