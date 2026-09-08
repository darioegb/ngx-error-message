import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'

import {
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr,
} from '@angular/common/http'
import { provideTranslateService } from '@ngx-translate/core'
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader'

import { routes } from './app.routes'
import { provideNgxErrorMessage } from 'ngx-error-message'

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
    provideRouter(routes),
    provideTranslateService({ fallbackLang: 'en' }),
    provideTranslateHttpLoader(),
    provideNgxErrorMessage(),
  ],
}
