import { provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ENGLISH_TRANSLATIONS } from '../test'
import { regEx } from './ngx-error-message-constant'

import { NgxErrorMessageService } from './ngx-error-message.service'
import { ERROR_MESSAGE_CONFIG } from './ngx-error-message.token'
import { TranslateTestingModule } from 'ngx-translate-testing'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

describe('NgxErrorMessageService', () => {
  let fb: FormBuilder

  const initForm = (): FormGroup =>
    fb.group({
      username: [
        null,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[a-zA-Z0-9.]+$'),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      phone: [
        null,
        [Validators.required, Validators.pattern(regEx.phoneNumber)],
      ],
    })

  describe('Without object config', () => {
    let service: NgxErrorMessageService

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
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
      })
      fb = TestBed.inject(FormBuilder)
      service = TestBed.inject(NgxErrorMessageService)
    })

    it('should be created', () => {
      expect(service).toBeTruthy()
    })

    it('getErrorMessage should return message when formControl is invalid', () => {
      const group = initForm()
      const control = group.controls['username']
      expect(service.getErrorMessage(control.errors!)).toBe(
        ENGLISH_TRANSLATIONS.validations.required,
      )
    })

    it('getErrorMessage with param should return message when formControl is invalid', () => {
      const group = initForm()
      const control = group.controls['username']
      control.setValue('thisIsAlongTestUserName')
      expect(service.getErrorMessage(control.errors!)).toContain(
        'The maximum length allowed is',
      )
    })

    it('getErrorMessage with patternKey should return message when formControl is invalid', () => {
      const group = initForm()
      const control = group.controls['username']
      control.setValue('test$')
      expect(service.getErrorMessage(control.errors!, 'custom')).toBe(
        ENGLISH_TRANSLATIONS.validations.pattern.custom,
      )
    })

    it('getErrorMessage should return message when formControl is invalid and use default regex', () => {
      const group = initForm()
      const control = group.controls['phone']
      control.setValue('isNotPhoneNumber')
      expect(service.getErrorMessage(control.errors!)).toBe(
        ENGLISH_TRANSLATIONS.validations.pattern.phoneNumber,
      )
    })

    it('getErrorMessage should return empty string when there are no errors', () => {
      const group = initForm()
      const control = group.controls['username']
      control.setErrors(null)
      expect(service.getErrorMessage(control.errors || {})).toBe('')
    })

    it('getErrorMessage should return translated message when translate service is provided', () => {
      const group = initForm()
      const control = group.controls['email']
      control.setErrors({ email: true })
      expect(service.getErrorMessage(control.errors!)).toBe(
        ENGLISH_TRANSLATIONS.validations.email,
      )
    })

    it('getErrorMessage should interpolate message with param', () => {
      const group = initForm()
      const control = group.controls['username']
      control.setErrors({ maxlength: { requiredLength: 10, actualLength: 15 } })
      expect(
        service.getErrorMessage(control.errors!, undefined, '10'),
      ).toContain('The maximum length allowed is 10')
    })
  })
  describe('With object config', () => {
    let service: NgxErrorMessageService

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [],
        providers: [
          FormBuilder,
          NgxErrorMessageService,
          {
            provide: ERROR_MESSAGE_CONFIG,
            useValue: {
              validationsPrefix: 'validations',
              patternsPrefix: 'pattern',
              errorMessages: ENGLISH_TRANSLATIONS.validations,
            },
          },
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting(),
        ],
      })
      fb = TestBed.inject(FormBuilder)
      service = TestBed.inject(NgxErrorMessageService)
    })

    it('getErrorMessage should return message for custom pattern key', () => {
      const group = initForm()
      const control = group.controls['phone']
      control.setErrors({ pattern: { requiredPattern: regEx.phoneNumber } })
      expect(service.getErrorMessage(control.errors!, 'custom')).toBe(
        ENGLISH_TRANSLATIONS.validations.pattern.custom,
      )
    })
  })
})
