import { Injectable } from '@angular/core';
import { ValidationErrors, AbstractControl } from '@angular/forms';

import { regEx, requiredRegex } from './ngx-error-message-constant';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class NgxErrorMessageService {
  private errorMessages: { [key: string]: string };
  private errorMessage: string;

  constructor(private translate: TranslateService) {
    this.translate
      .get('validations')
      .subscribe({ next: (res) => (this.errorMessages = res) });
  }

  isNotValid(control: AbstractControl): boolean {
    return control.invalid && control.touched;
  }

  getErrorMessage(control: AbstractControl, patternKey?: string): string {
    const controlErrors: ValidationErrors = control.errors;
    const lastError = Object.entries(controlErrors).pop();
    typeof lastError[1] !== 'boolean'
      ? this.setErrorMessage(lastError[0], lastError[1], patternKey)
      : this.setErrorMessage(lastError[0]);
    return this.errorMessage;
  }

  private setErrorMessage(key: string, value?: undefined, patternKey?: string) {
    const requiredValue = value
      ? this.getValueByRegexFromObject(value, requiredRegex)
      : null;
    this.errorMessage =
      key !== 'pattern'
        ? this.getMessage(key, requiredValue)
        : this.patternMatchExpression(value, patternKey);
  }

  private patternMatchExpression(
    value: { requiredPattern: string | RegExp; actualValue: string },
    patternKey?: string
  ): string {
    const regExpDefault = Object.entries(regEx).find(
      ([_, val]) => val.toString() === value.requiredPattern
    );
    const messageKey = regExpDefault ? regExpDefault[0] : patternKey;
    return this.getMessageFromPattern(messageKey);
  }

  private getValueByRegexFromObject(
    obj: { [key: string]: unknown } | ArrayLike<unknown>,
    regex: RegExp
  ) {
    return Object.entries(obj).find(([key]) => regex.test(key))[1] as string;
  }

  private getMessage(key: string, param?: string): string {
    return param
      ? this.errorMessages[key].replace('{{param}}', param)
      : this.errorMessages[key];
  }

  private getMessageFromPattern(key: string) {
    return this.errorMessages.pattern[key];
  }
}
