import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import { AppComponent } from './app.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxErrorMessageModule } from '../../../ngx-error-message/src/lib/ngx-error-message.module'
import {
  ReactiveFormsComponent,
  TemplateDrivenFormsComponent,
} from './pages'
import { AppRoutingModule } from './app-routing.module'
import { AvoidMultipleZeroValidatorDirective } from './directives/avoid-mutiple-zero-validator.directive'
import { WithoutInternationalizationModule } from './pages/without-internationalization/without-internationalization.module'
import { ComponentsModule } from './components/components.module'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

@NgModule({
  declarations: [
    AppComponent,
    ReactiveFormsComponent,
    TemplateDrivenFormsComponent,
    AvoidMultipleZeroValidatorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FormsModule,
    ReactiveFormsModule,
    NgxErrorMessageModule.forRoot(),
    ComponentsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private translate: TranslateService) {
    const lang = localStorage.getItem('lang')
    this.translate.use(lang ? lang : this.translate.defaultLang)
  }
}
