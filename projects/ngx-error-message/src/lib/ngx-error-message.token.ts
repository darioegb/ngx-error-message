import { InjectionToken } from '@angular/core'
import { ResolvedErrorMessageConfig } from './ngx-error-message-interfaces'

export const ERROR_MESSAGE_CONFIG =
  new InjectionToken<ResolvedErrorMessageConfig>('ERROR_MESSAGE_CONFIG')
