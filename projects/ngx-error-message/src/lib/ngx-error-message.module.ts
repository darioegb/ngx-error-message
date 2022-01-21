import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NgxErrorMessageComponent } from './ngx-error-message.component';
import { NgxErrorMessageDirective } from './ngx-error-message.directive';

@NgModule({
    declarations: [
        NgxErrorMessageComponent,
        NgxErrorMessageDirective
    ],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [
        NgxErrorMessageDirective
    ]
})
export class NgxErrorMessageModule { }
