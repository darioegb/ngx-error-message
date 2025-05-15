import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'

import { provideHttpClient, HttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import { routes } from './app.routes'
import { provideNgxErrorMessage } from 'projects/ngx-error-message/src/lib/provide-ngx-error-message'

export const httpLoaderFactory = (http: HttpClient) =>
  new TranslateHttpLoader(http)


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        useDefaultLang: true,
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ),
    provideNgxErrorMessage()
  ],
}
