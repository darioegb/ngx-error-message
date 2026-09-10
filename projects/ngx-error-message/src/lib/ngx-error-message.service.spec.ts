import { provideHttpClientTesting } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ENGLISH_TRANSLATIONS } from '@testing/translations'
import { regEx } from './ngx-error-message-constant'

import { NgxErrorMessageService } from './ngx-error-message.service'
import { NgxErrorMessageTranslator } from './ngx-error-message.translator'
import { NGX_ERROR_MESSAGE_TRANSLATOR } from './ngx-error-message.translator'
import {
  provideNgxErrorMessage,
  withErrorMessageConfig,
} from './provide-ngx-error-message'
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr,
} from '@angular/common/http'

// A translator here (rather than the real @ngx-translate/core adapter from
// the `ngx-translate` secondary entry point) keeps this spec testing what it
// should: that the service picks the right error key and delegates to
// *some* translator correctly. The adapter itself has its own spec next to
// its source.
class FakeTranslator implements NgxErrorMessageTranslator {
  translate(key: string, params?: Record<string, string>): string {
    const value = key
      .split('.')
      .reduce<unknown>(
        (acc, segment) =>
          acc && typeof acc === 'object'
            ? (acc as Record<string, unknown>)[segment]
            : undefined,
        ENGLISH_TRANSLATIONS,
      )
    if (typeof value !== 'string') {
      return ''
    }
    return params
      ? value.replace(/\{\{(\w+)\}\}/g, (_, name) => params[name] ?? '')
      : value
  }
}

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
        providers: [
          FormBuilder,
          ...provideNgxErrorMessage(),
          provideHttpClient(withXhr(), withInterceptorsFromDi()),
          provideHttpClientTesting(),
        ],
      })
      fb = TestBed.inject(FormBuilder)
      service = TestBed.inject(NgxErrorMessageService)
    })

    it('should be created', () => {
      expect(service).toBeTruthy()
    })

    it('getErrorMessage should return empty string when there are no errors', () => {
      const group = initForm()
      const control = group.controls['username']
      control.setErrors(null)
      expect(service.getErrorMessage(control.errors || {})).toBe('')
    })

    it('getErrorMessage should return empty string when no translator or dictionary is configured', () => {
      const group = initForm()
      const control = group.controls['username']
      expect(service.getErrorMessage(control.errors!)).toBe('')
    })
  })

  describe('With translator', () => {
    let service: NgxErrorMessageService

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          FormBuilder,
          ...provideNgxErrorMessage(),
          {
            provide: NGX_ERROR_MESSAGE_TRANSLATOR,
            useValue: new FakeTranslator(),
          },
          provideHttpClient(withXhr(), withInterceptorsFromDi()),
          provideHttpClientTesting(),
        ],
      })
      fb = TestBed.inject(FormBuilder)
      service = TestBed.inject(NgxErrorMessageService)
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

    it('getErrorMessage should return translated message for a boolean error', () => {
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
        providers: [
          FormBuilder,
          ...provideNgxErrorMessage(
            withErrorMessageConfig({
              errorMessages: ENGLISH_TRANSLATIONS.validations,
            }),
          ),
          provideHttpClient(withXhr(), withInterceptorsFromDi()),
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

  describe('With a custom error priority', () => {
    let service: NgxErrorMessageService

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          FormBuilder,
          ...provideNgxErrorMessage(
            withErrorMessageConfig({
              errorMessages: ENGLISH_TRANSLATIONS.validations,
              errorPriority: ['maxlength', 'required'],
            }),
          ),
          provideHttpClient(withXhr(), withInterceptorsFromDi()),
          provideHttpClientTesting(),
        ],
      })
      fb = TestBed.inject(FormBuilder)
      service = TestBed.inject(NgxErrorMessageService)
    })

    it('getErrorMessage should prefer the configured priority over insertion order', () => {
      const group = initForm()
      const control = group.controls['username']
      control.setErrors({ required: true, maxlength: { requiredLength: 10 } })
      expect(service.getErrorMessage(control.errors!)).toContain(
        'The maximum length allowed is',
      )
    })

    it('getErrorMessage should fall back to insertion order for keys outside the priority list', () => {
      const group = initForm()
      const control = group.controls['username']
      control.setErrors({
        email: true,
        minlength: { requiredLength: 5, actualLength: 3 },
      })
      expect(service.getErrorMessage(control.errors!)).toContain(
        'The minimum allowed length is',
      )
    })
  })
})
