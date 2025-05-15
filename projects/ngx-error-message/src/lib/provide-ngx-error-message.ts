import { Provider } from '@angular/core'
import { ErrorMessageConfig } from './ngx-error-message-interfaces'
import { ERROR_MESSAGE_CONFIG } from './ngx-error-message.token'
import { NgxErrorMessageService } from './ngx-error-message.service'

export function provideNgxErrorMessage(
  config?: ErrorMessageConfig,
): Provider[] {
  return [
    {
      provide: ERROR_MESSAGE_CONFIG,
      useValue: {
        validationsPrefix: config?.validationsPrefix ?? 'validations',
        patternsPrefix: config?.patternsPrefix ?? 'pattern',
        errorMessages: config?.errorMessages ?? {},
      },
    },
    NgxErrorMessageService,
  ]
}
