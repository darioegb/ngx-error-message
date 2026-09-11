import { Provider, inject } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import {
  NGX_ERROR_MESSAGE_TRANSLATOR,
  NgxErrorMessageTranslator,
} from 'ngx-error-message'

class TranslateServiceTranslator implements NgxErrorMessageTranslator {
  private readonly translateService = inject(TranslateService)

  translate(key: string, params?: Record<string, string>): string {
    // #translate(), not #instant(): its computed() already tracks
    // currentLang/fallbackLang/translations-loaded, so reading it here is
    // reactive for free.
    return this.translateService.translate(key, params)() as string
  }
}

/**
 * Wires ngx-error-message's message resolution to `@ngx-translate/core`.
 * Pass as a feature to `provideNgxErrorMessage()`:
 * `provideNgxErrorMessage(withNgxTranslate())`.
 */
export function withNgxTranslate(): Provider[] {
  return [
    {
      provide: NGX_ERROR_MESSAGE_TRANSLATOR,
      useClass: TranslateServiceTranslator,
    },
  ]
}
