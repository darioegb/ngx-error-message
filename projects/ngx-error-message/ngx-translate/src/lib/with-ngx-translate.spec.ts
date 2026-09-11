import { TestBed } from '@angular/core/testing'
import { TranslateService } from '@ngx-translate/core'
import { NGX_ERROR_MESSAGE_TRANSLATOR } from 'ngx-error-message'
import { provideTestTranslateService } from '@testing/translate-testing'
import {
  ENGLISH_TRANSLATIONS,
  SPANISH_TRANSLATIONS,
} from '@testing/translations'
import { withNgxTranslate } from './with-ngx-translate'

// This spec (unlike ngx-error-message.service.spec.ts, which uses a fake
// translator) is the one place that exercises the real @ngx-translate/core
// adapter end to end.
describe('withNgxTranslate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideTestTranslateService({
          en: ENGLISH_TRANSLATIONS,
          es: SPANISH_TRANSLATIONS,
        }),
        withNgxTranslate(),
      ],
    })
  })

  it('overrides NGX_ERROR_MESSAGE_TRANSLATOR with an adapter backed by TranslateService', () => {
    const translator = TestBed.inject(NGX_ERROR_MESSAGE_TRANSLATOR)
    expect(translator.translate('validations.required')).toBe(
      ENGLISH_TRANSLATIONS.validations.required,
    )
  })

  it('reflects the active language after TranslateService#use()', () => {
    const translator = TestBed.inject(NGX_ERROR_MESSAGE_TRANSLATOR)
    TestBed.inject(TranslateService).use('es')
    expect(translator.translate('validations.required')).toBe(
      SPANISH_TRANSLATIONS.validations.required,
    )
  })

  it('interpolates params the same way TranslateService#instant() does', () => {
    const translator = TestBed.inject(NGX_ERROR_MESSAGE_TRANSLATOR)
    expect(translator.translate('validations.maxlength', { param: '10' })).toBe(
      ENGLISH_TRANSLATIONS.validations.maxlength.replace('{{param}}', '10'),
    )
  })
})
