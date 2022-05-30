import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { NgxErrorMessageService } from './ngx-error-message.service';

@Pipe({
  name: 'ngxErrorMessage'
})
export class NgxErrorMessagePipe implements PipeTransform {

  constructor(private errorMessageService: NgxErrorMessageService) {}

  transform(value: ValidationErrors | null, patternKey?: string): string {
    return this.errorMessageService.getErrorMessage(
      value,
      patternKey
    );
  }

}
