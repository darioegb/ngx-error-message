import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxErrorMessageComponent } from './ngx-error-message.component';
import { NgxErrorMessageDirective } from './ngx-error-message.directive';

@NgModule({
  declarations: [
    NgxErrorMessageComponent,
    NgxErrorMessageDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxErrorMessageDirective
  ],
  entryComponents: [
    NgxErrorMessageComponent
  ]
})
export class NgxErrorMessageModule { }
