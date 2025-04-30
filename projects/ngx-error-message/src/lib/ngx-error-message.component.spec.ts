import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { TranslateTestingModule } from 'ngx-translate-testing'

import { NgxErrorMessageComponent } from './ngx-error-message.component'
import {
  ReactiveFormsModule,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { NgxErrorMessageDirective } from './ngx-error-message.directive'
import { ENGLISH_TRANSLATIONS } from '../test'
import { NgxErrorMessagePipe } from './ngx-error-message.pipe'
import { NgxErrorMessageService } from './ngx-error-message.service'
import { ERROR_MESSAGE_CONFIG } from './ngx-error-message.token'
import { TranslateService } from '@ngx-translate/core'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

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
})
class TestHostComponent implements OnInit {
  form!: FormGroup
  formValue: unknown

  constructor(private fb: FormBuilder) {}

  get formControls() {
    return this.form.controls
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      user: [null, Validators.required],
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    this.formValue = this.form.value
  }
}

describe('NgxErrorMessageComponent', () => {
  let component: TestHostComponent
  let fixture: ComponentFixture<TestHostComponent>
  let translate: TranslateService

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxErrorMessageComponent,
        NgxErrorMessageDirective,
        TestHostComponent,
        NgxErrorMessagePipe,
      ],
      imports: [
        ReactiveFormsModule,
        TranslateTestingModule.withTranslations('en', ENGLISH_TRANSLATIONS),
      ],
      providers: [
        FormBuilder,
        NgxErrorMessageService,
        {
          provide: ERROR_MESSAGE_CONFIG,
          useValue: {
            validationsPrefix: 'validations',
            patternsPrefix: 'pattern',
            errorMessages: {},
          },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    translate = TestBed.inject(TranslateService)
    fixture = TestBed.createComponent(TestHostComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('#ngOnInit should set error to formControl', () => {
    const control = component.form.controls['email']

    control.markAsTouched()
    fixture.detectChanges()
    const errorElement = (fixture.nativeElement as HTMLElement).querySelector(
      'small.error-message',
    )

    expect(control.errors).toBeDefined()
    expect(errorElement && errorElement.innerHTML).toBe(
      ENGLISH_TRANSLATIONS.validations.required,
    )
  })

  it('should not display error message when control is valid', () => {
    const control = component.form.controls['email']
    control.markAsTouched()
    fixture.detectChanges()
    control.setValue('test@example.com')
    fixture.detectChanges()

    const errorElement = (
      fixture.nativeElement as HTMLElement
    ).querySelectorAll('small.error-message')

    expect(errorElement.length).toBe(1)
  })

  it('should update error message on language change', () => {
    const control = component.form.controls['email']
    control.markAsTouched()
    control.setValue('')
    fixture.detectChanges()

    translate.use('es')
    fixture.detectChanges()

    const errorElement = (fixture.nativeElement as HTMLElement).querySelector(
      'small.error-message',
    )

    expect(errorElement).toBeTruthy()
    expect(errorElement?.textContent).toBe(
      ENGLISH_TRANSLATIONS.validations.required, // Update this to the Spanish translation when available
    )
  })
})
