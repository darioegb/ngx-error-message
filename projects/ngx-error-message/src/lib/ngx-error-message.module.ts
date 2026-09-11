import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { NgxErrorMessageComponent } from './ngx-error-message.component'
import { NgxErrorMessageDirective } from './ngx-error-message.directive'
import { NgxErrorMessagePipe } from './ngx-error-message.pipe'
import { ErrorMessageConfig } from './ngx-error-message-interfaces'
import {
  provideNgxErrorMessage,
  withErrorMessageConfig,
} from './provide-ngx-error-message'

/**
 * @deprecated Use `provideNgxErrorMessage()` instead. Will be removed in a
 * future major version. Note: `NgxErrorMessageModule` alone doesn't wire up
 * `@ngx-translate/core` - add `withNgxTranslate()` (from the
 * `ngx-error-message/ngx-translate` secondary entry point) to your own
 * providers if you need it.
 */
@NgModule({
  imports: [
    CommonModule,
    NgxErrorMessageComponent,
    NgxErrorMessageDirective,
    NgxErrorMessagePipe,
  ],
  exports: [NgxErrorMessageDirective],
})
export class NgxErrorMessageModule {
  static forRoot(
    config?: ErrorMessageConfig,
  ): ModuleWithProviders<NgxErrorMessageModule> {
    return {
      ngModule: NgxErrorMessageModule,
      providers: provideNgxErrorMessage(withErrorMessageConfig(config ?? {})),
    }
  }

  static forChild(
    config?: ErrorMessageConfig,
  ): ModuleWithProviders<NgxErrorMessageModule> {
    return this.forRoot(config)
  }
}
