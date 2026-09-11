import { Provider } from '@angular/core'
import { DEFAULT_ERROR_PRIORITY } from './ngx-error-message-constant'
import { ErrorMessageConfig } from './ngx-error-message-interfaces'
import { ERROR_MESSAGE_CONFIG } from './ngx-error-message.token'
import { NgxErrorMessageService } from './ngx-error-message.service'

function resolveConfig(config: ErrorMessageConfig) {
  return {
    validationsPrefix: config.validationsPrefix ?? 'validations',
    patternsPrefix: config.patternsPrefix ?? 'pattern',
    errorMessages: config.errorMessages ?? {},
    errorPriority: config.errorPriority ?? DEFAULT_ERROR_PRIORITY,
  }
}

/**
 * Composable, like `provideHttpClient(withXhr(), ...)`:
 * `provideNgxErrorMessage(withErrorMessageConfig({...}), withNgxTranslate())`.
 */
export function provideNgxErrorMessage(...features: Provider[][]): Provider[] {
  return [
    { provide: ERROR_MESSAGE_CONFIG, useValue: resolveConfig({}) },
    NgxErrorMessageService,
    ...features.flat(),
  ]
}

export function withErrorMessageConfig(config: ErrorMessageConfig): Provider[] {
  return [{ provide: ERROR_MESSAGE_CONFIG, useValue: resolveConfig(config) }]
}
