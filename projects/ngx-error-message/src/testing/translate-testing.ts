import { Provider } from '@angular/core'
import { Observable, of } from 'rxjs'
import {
  provideTranslateService,
  TranslateLoader,
  TranslationObject,
} from '@ngx-translate/core'

// ngx-translate-testing doesn't support @ngx-translate/core v18 (it still
// imports TranslateModule/TranslateFakeCompiler/FakeMissingTranslationHandler,
// all removed there), so specs provide translations synchronously with this
// instead.
class StaticTranslateLoader extends TranslateLoader {
  constructor(
    private readonly translations: Record<string, TranslationObject>,
  ) {
    super()
  }

  getTranslation(lang: string): Observable<TranslationObject> {
    return of(this.translations[lang])
  }
}

export function provideTestTranslateService(
  translations: Record<string, TranslationObject>,
  lang = Object.keys(translations)[0],
): Provider[] {
  return provideTranslateService({
    lang,
    fallbackLang: lang,
    loader: () => new StaticTranslateLoader(translations),
  })
}
