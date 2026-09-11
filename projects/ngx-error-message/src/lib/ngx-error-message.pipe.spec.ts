import { TestBed } from '@angular/core/testing'
import { Injector, runInInjectionContext } from '@angular/core'

import { NgxErrorMessagePipe } from './ngx-error-message.pipe'
import {
  provideNgxErrorMessage,
  withErrorMessageConfig,
} from './provide-ngx-error-message'
import { ENGLISH_TRANSLATIONS } from '@testing/translations'

describe('NgxErrorMessagePipe', () => {
  let pipe: NgxErrorMessagePipe

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideNgxErrorMessage(
          withErrorMessageConfig({
            errorMessages: ENGLISH_TRANSLATIONS.validations,
          }),
        ),
      ],
    })
    pipe = runInInjectionContext(
      TestBed.inject(Injector),
      () => new NgxErrorMessagePipe(),
    )
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('transforms form error to error message', () => {
    expect(
      pipe.transform({
        required: true,
      }),
    ).toBe(ENGLISH_TRANSLATIONS.validations.required)
  })

  it('returns empty string when value is null', () => {
    expect(pipe.transform(null)).toBe('')
  })

  it('forwards patternKey to the service', () => {
    expect(pipe.transform({ pattern: { requiredPattern: '' } }, 'custom')).toBe(
      ENGLISH_TRANSLATIONS.validations.pattern.custom,
    )
  })

  it('is a pure function: same input, same output, no manual caching involved', () => {
    const error = { required: true }
    expect(pipe.transform(error)).toBe(pipe.transform(error))
  })

  it('reflects the current control errors on every call, unlike a cache keyed by the last error seen', () => {
    const requiredMessage = pipe.transform({ required: true })
    const minLengthMessage = pipe.transform({
      minlength: { requiredLength: 5, actualLength: 3 },
    })
    expect(requiredMessage).not.toBe(minLengthMessage)
    expect(pipe.transform({ required: true })).toBe(requiredMessage)
  })
})
