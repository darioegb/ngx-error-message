import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { regEx, requiredRegex } from './ngx-error-message-constant';
import { TranslateService } from '@ngx-translate/core';
import { JsonMessage } from './ngx-error-message-interfaces';

@Injectable({
  providedIn: 'root',
})
export class NgxErrorMessageService {
  private errorMessages!: JsonMessage<string>;
  private errorMessage!: string;

  constructor(private translate: TranslateService) {
    this.getTranslations();
  }

  getErrorMessage(controlErrors: ValidationErrors | null, patternKey?: string): string {
    const lastError = controlErrors && Object.entries(controlErrors).pop();
    if (lastError) {
      const lastErrorType = typeof lastError[1] !== 'boolean';
      lastErrorType
        ? this.setErrorMessage(lastError[0], lastError[1], patternKey)
        : this.setErrorMessage(lastError[0]);
    }
    return this.errorMessage;
  }

  getTranslations() {
    this.translate
      .get('validations')
      .subscribe({ next: (res) => (this.errorMessages = res) });
  }

  private setErrorMessage(
    key: string,
    value?: Record<string, unknown> | undefined,
    patternKey?: string
  ): void {
    const requiredValue = value
      ? this.getValueByRegexFromObject(value, requiredRegex)
      : undefined;
    this.errorMessage =
      key !== 'pattern'
        ? this.getMessage(key, requiredValue)
        : this.patternMatchExpression(value, patternKey);
  }

  private patternMatchExpression(
    value: Record<string, unknown> | undefined,
    patternKey?: string
  ): string {
    const regExpDefault = value && Object.entries(regEx).find(
      ([_, val]) => val.toString() === value['requiredPattern']
    );
    const messageKey = regExpDefault ? regExpDefault[0] : patternKey;
    return this.getMessageFromPattern(messageKey as string);
  }

  private getValueByRegexFromObject(
    obj: Record<string, unknown>,
    regex: RegExp
  ): string | undefined {
    const findValue = Object.entries(obj).find(([key]) => regex.test(key));
    return findValue && findValue[1] as string;
  }

  private getMessage(key: string, param?: string): string {
    const errorMessage = this.errorMessages[key] as string;
    return param ? errorMessage.replace('{{param}}', param) : errorMessage;
  }

  private getMessageFromPattern(key: string): string {
    return (this.errorMessages['pattern'] as Record<string, string>)[key];
  }
}
