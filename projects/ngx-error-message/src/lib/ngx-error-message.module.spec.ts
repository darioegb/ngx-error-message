import { TestBed } from '@angular/core/testing'
import { NgxErrorMessageModule } from './ngx-error-message.module'
import { ERROR_MESSAGE_CONFIG } from './ngx-error-message.token'
import { NgxErrorMessageService } from './ngx-error-message.service'
import { ErrorMessageConfig } from './ngx-error-message-interfaces'

describe('NgxErrorMessageModule', () => {
  it('forRoot() should provide default config when no config is given', () => {
    TestBed.configureTestingModule({
      imports: [NgxErrorMessageModule.forRoot()],
    })

    expect(TestBed.inject(ERROR_MESSAGE_CONFIG)).toEqual({
      validationsPrefix: 'validations',
      patternsPrefix: 'pattern',
      errorMessages: {},
    })
    expect(TestBed.inject(NgxErrorMessageService)).toBeTruthy()
  })

  it('forRoot() should provide the given config in full', () => {
    const config: ErrorMessageConfig = {
      validationsPrefix: 'VALIDATIONS',
      patternsPrefix: 'PATTERNS',
      errorMessages: { required: 'Required' },
    }

    TestBed.configureTestingModule({
      imports: [NgxErrorMessageModule.forRoot(config)],
    })

    expect(TestBed.inject(ERROR_MESSAGE_CONFIG)).toEqual(config)
  })

  it('forChild() should fall back to defaults for the properties not given', () => {
    TestBed.configureTestingModule({
      imports: [
        NgxErrorMessageModule.forChild({ validationsPrefix: 'VALIDATIONS' }),
      ],
    })

    expect(TestBed.inject(ERROR_MESSAGE_CONFIG)).toEqual({
      validationsPrefix: 'VALIDATIONS',
      patternsPrefix: 'pattern',
      errorMessages: {},
    })
  })
})
