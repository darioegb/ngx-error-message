import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxErrorMessageService } from './ngx-error-message.service';

@Pipe({
  name: 'ngxErrorMessage',
  pure: false,
})
export class NgxErrorMessagePipe implements PipeTransform {
  private cachedData = '';
  private cachedError: ValidationErrors | null = null;

  constructor(private errorMessageService: NgxErrorMessageService, private translate: TranslateService) {
    this.translate.onLangChange
      .subscribe(() => {
        this.cachedError = null;
        errorMessageService.getTranslations();
      });
  }

  transform(value: ValidationErrors | null, patternKey?: string): string {
    if (value !== this.cachedError) {
      this.cachedError = value;
      this.cachedData = this.errorMessageService.getErrorMessage(
        value,
        patternKey
      );
    }
    return this.cachedData;
  }

}
