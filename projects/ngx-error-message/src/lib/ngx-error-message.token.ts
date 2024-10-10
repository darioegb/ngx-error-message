import { InjectionToken } from '@angular/core'
import { ErrorMessageConfig } from './ngx-error-message-interfaces'

export const ERROR_MESSAGE_CONFIG = new InjectionToken<ErrorMessageConfig>(
  'ERROR_MESSAGE_CONFIG',
)
