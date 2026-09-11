import {
  ClassNames,
  DEFAULT_ERROR_PRIORITY,
  ERROR_MESSAGE_CONFIG,
  ErrorMessageConfig,
  ErrorPriority,
  ErrorWhenType,
  NGX_ERROR_MESSAGE_TRANSLATOR,
  NgxErrorMessageComponent,
  NgxErrorMessageDirective,
  NgxErrorMessageModule,
  NgxErrorMessagePipe,
  NgxErrorMessageService,
  NgxErrorMessageTranslator,
  ResolvedErrorMessageConfig,
  provideNgxErrorMessage,
  regEx,
  withErrorMessageConfig,
} from './public-api'

describe('public-api', () => {
  it('exports the runtime symbols consumers rely on', () => {
    expect(NgxErrorMessageDirective).toBeTruthy()
    expect(NgxErrorMessageComponent).toBeTruthy()
    expect(NgxErrorMessagePipe).toBeTruthy()
    expect(NgxErrorMessageService).toBeTruthy()
    expect(NgxErrorMessageModule).toBeTruthy()
    expect(ERROR_MESSAGE_CONFIG).toBeTruthy()
    expect(NGX_ERROR_MESSAGE_TRANSLATOR).toBeTruthy()
    expect(regEx).toBeTruthy()
    expect(DEFAULT_ERROR_PRIORITY).toBeTruthy()
    expect(typeof provideNgxErrorMessage).toBe('function')
    expect(typeof withErrorMessageConfig).toBe('function')
  })

  it('exports provideNgxErrorMessage and withErrorMessageConfig as composable Provider factories', () => {
    const providers = provideNgxErrorMessage(
      withErrorMessageConfig({ validationsPrefix: 'validations' }),
    )
    expect(Array.isArray(providers)).toBe(true)
    expect(providers.length).toBeGreaterThan(0)
  })

  it('type-checks the exported interfaces', () => {
    const classNames: ClassNames = { control: 'a', message: 'b' }
    const when: ErrorWhenType = 'invalid'
    const config: ErrorMessageConfig = { errorMessages: {} }
    const resolvedConfig: ResolvedErrorMessageConfig = {
      validationsPrefix: 'validations',
      patternsPrefix: 'pattern',
      errorMessages: {},
      errorPriority: DEFAULT_ERROR_PRIORITY,
    }
    const priority: ErrorPriority[] = ['required']
    const translator: NgxErrorMessageTranslator = {
      translate: () => '',
    }
    expect(classNames.control).toBe('a')
    expect(when).toBe('invalid')
    expect(config.errorMessages).toEqual({})
    expect(resolvedConfig.errorPriority).toBe(DEFAULT_ERROR_PRIORITY)
    expect(priority).toEqual(['required'])
    expect(translator.translate('validations.required')).toBe('')
  })
})
