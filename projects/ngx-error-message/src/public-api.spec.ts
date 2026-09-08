import {
  ClassNames,
  ERROR_MESSAGE_CONFIG,
  ErrorMessageConfig,
  ErrorWhenType,
  NgxErrorMessageComponent,
  NgxErrorMessageDirective,
  NgxErrorMessageModule,
  NgxErrorMessagePipe,
  NgxErrorMessageService,
  provideNgxErrorMessage,
  regEx,
} from './public-api'

describe('public-api', () => {
  it('exports the runtime symbols consumers rely on', () => {
    expect(NgxErrorMessageDirective).toBeTruthy()
    expect(NgxErrorMessageComponent).toBeTruthy()
    expect(NgxErrorMessagePipe).toBeTruthy()
    expect(NgxErrorMessageService).toBeTruthy()
    expect(NgxErrorMessageModule).toBeTruthy()
    expect(ERROR_MESSAGE_CONFIG).toBeTruthy()
    expect(regEx).toBeTruthy()
    expect(typeof provideNgxErrorMessage).toBe('function')
  })

  it('exports provideNgxErrorMessage as a usable Provider factory', () => {
    const providers = provideNgxErrorMessage({
      validationsPrefix: 'validations',
    })
    expect(Array.isArray(providers)).toBe(true)
    expect(providers.length).toBeGreaterThan(0)
  })

  it('type-checks the exported interfaces', () => {
    const classNames: ClassNames = { control: 'a', message: 'b' }
    const when: ErrorWhenType = 'invalid'
    const config: ErrorMessageConfig = { errorMessages: {} }
    expect(classNames.control).toBe('a')
    expect(when).toBe('invalid')
    expect(config.errorMessages).toEqual({})
  })
})
