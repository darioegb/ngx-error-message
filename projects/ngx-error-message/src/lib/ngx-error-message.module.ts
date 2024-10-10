import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TranslateModule } from '@ngx-translate/core'

import { NgxErrorMessageComponent } from './ngx-error-message.component'
import { NgxErrorMessageDirective } from './ngx-error-message.directive'
import { NgxErrorMessagePipe } from './ngx-error-message.pipe'
import { ErrorMessageConfig } from './ngx-error-message-interfaces'
import { ERROR_MESSAGE_CONFIG } from './ngx-error-message.token'
import { NgxErrorMessageService } from './ngx-error-message.service'

@NgModule({
  declarations: [
    NgxErrorMessageComponent,
    NgxErrorMessageDirective,
    NgxErrorMessagePipe,
  ],
  imports: [CommonModule, TranslateModule],
  exports: [NgxErrorMessageDirective],
})
export class NgxErrorMessageModule {
  static forRoot(
    config?: ErrorMessageConfig,
  ): ModuleWithProviders<NgxErrorMessageModule> {
    return NgxErrorMessageModule.forRootOrChild(config)
  }

  static forChild(
    config?: ErrorMessageConfig,
  ): ModuleWithProviders<NgxErrorMessageModule> {
    return NgxErrorMessageModule.forRootOrChild(config)
  }

  private static forRootOrChild(
    config?: ErrorMessageConfig,
  ): ModuleWithProviders<NgxErrorMessageModule> {
    return {
      ngModule: NgxErrorMessageModule,
      providers: [
        {
          provide: ERROR_MESSAGE_CONFIG,
          useValue: {
            validationsPrefix: config?.validationsPrefix ?? 'validations',
            patternsPrefix: config?.patternsPrefix ?? 'pattern',
            errorMessages: config?.errorMessages ?? {},
          },
        },
        NgxErrorMessageService,
      ],
    }
  }
}
