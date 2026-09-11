import { InjectionToken } from '@angular/core'

/**
 * Resolves a translation key to a message. The default implementation is a
 * zero-dependency no-op; `withNgxTranslate()` from the
 * `ngx-error-message/ngx-translate` secondary entry point overrides it with
 * an `@ngx-translate/core`-backed adapter.
 *
 * `translate()` is a plain synchronous method - implementations that read
 * signals while computing their result get reactivity for free, since
 * callers only ever invoke it from inside the directive's `computed()`.
 */
export interface NgxErrorMessageTranslator {
  translate(key: string, params?: Record<string, string>): string
}

class NoopTranslator implements NgxErrorMessageTranslator {
  translate(): string {
    return ''
  }
}

export const NGX_ERROR_MESSAGE_TRANSLATOR =
  new InjectionToken<NgxErrorMessageTranslator>(
    'NGX_ERROR_MESSAGE_TRANSLATOR',
    {
      providedIn: 'root',
      factory: () => new NoopTranslator(),
    },
  )
