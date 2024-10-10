import { HttpClientTestingModule } from '@angular/common/http/testing'
import { waitForAsync, TestBed } from '@angular/core/testing'
import { BrowserModule } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'
import { TranslateTestingModule } from 'ngx-translate-testing'

import { ENGLISH_TRANSLATIONS, SPANISH_TRANSLATIONS } from '../test'
import { NgxErrorMessagePipe } from './ngx-error-message.pipe'
import { runInInjectionContext } from '@angular/core'
import { ERROR_MESSAGE_CONFIG } from './ngx-error-message.token'
import { NgxErrorMessageService } from './ngx-error-message.service'

describe('NgxErrorMessagePipe', () => {
  let pipe: NgxErrorMessagePipe
  let translate: TranslateService

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations({
          en: ENGLISH_TRANSLATIONS,
          es: SPANISH_TRANSLATIONS,
        }),
      ],
      providers: [
        NgxErrorMessageService,
        {
          provide: ERROR_MESSAGE_CONFIG,
          useValue: {
            validationsPrefix: 'validations',
            patternsPrefix: 'pattern',
            errorMessages: {},
          },
        },
      ],
    })
    translate = TestBed.inject(TranslateService)
    pipe = runInInjectionContext(TestBed, () => new NgxErrorMessagePipe())
  }))

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('transforms form error to error message', () => {
    expect(
      pipe.transform({
        required: true,
      }),
    ).toBe('The field is required.')
  })
  it('transforms form error to error message when change lang', () => {
    translate.use('es')
    expect(
      pipe.transform({
        required: true,
      }),
    ).toBe('El campo es requerido.')
  })

  it('returns empty string when value is null', () => {
    expect(pipe.transform(null)).toBe('')
  })

  it('caches error message for the same error key', () => {
    const error = { required: true }
    const errorMessage = pipe.transform(error)
    expect(pipe.transform(error)).toBe(errorMessage)
  })

  it('updates cached error message when error key changes', () => {
    const requiredError = { required: true }
    const minLengthError = { minlength: { requiredLength: 5, actualLength: 3 } }
    const requiredMessage = pipe.transform(requiredError)
    const minLengthMessage = pipe.transform(minLengthError)
    expect(requiredMessage).not.toBe(minLengthMessage)
  })
})
