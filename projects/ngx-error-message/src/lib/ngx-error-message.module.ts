import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NgxErrorMessageComponent } from './ngx-error-message.component';
import { NgxErrorMessageDirective } from './ngx-error-message.directive';
import { NgxErrorMessagePipe } from './ngx-error-message.pipe';
import { NgxErrorMessageService } from './ngx-error-message.service';

@NgModule({
    declarations: [
        NgxErrorMessageComponent,
        NgxErrorMessageDirective,
        NgxErrorMessagePipe
    ],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [
        NgxErrorMessageDirective
    ]
})
export class NgxErrorMessageModule {
  constructor(private _: NgxErrorMessageService) {}
 }
