import { Injectable } from '@angular/core';
import { ValidationErrors, FormControl } from '@angular/forms';

import { regEx, requiredRegex } from './ngx-error-message-constant';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NgxErrorMessageService {

  private errorMessages: any;
  private errorMessage: string;

  constructor(
    private translate: TranslateService
  ) {
    this.translate.get('validations')
      .subscribe(res => {
        this.errorMessages = res;
      });
  }

  /**
   * @description This method check if form control is no valid
   * @param control the formControl to valid
   * @param rules the rules to display errors
   */
  isNotValid(control: FormControl): boolean {
    return control.invalid && control.touched;
  }

  /**
   * @description This method get error message to display
   * @param control the formControl to valid
   * @param patternKey custom pattern key
   * @returns string
   */
  getErrorMessage(control: FormControl, patternKey?: string): string {
    const controlErrors: ValidationErrors = control.errors;
    const lastError = Object.entries(controlErrors).pop();
    if (typeof lastError[1] !== 'boolean') {
      this.setErrorMessage(lastError[0], lastError[1], patternKey);
    } else {
      this.setErrorMessage(lastError[0]);
    }
    return this.errorMessage;
  }

  /**
   * @description Toggle error container class to the formControl
   * @param invalid formControl status
   * @param key formControlKey
   */
  toggleErrorContainer(invalid: boolean, key: string) {
    const element = document.querySelector<HTMLElement>(`[formcontrolname="${key}"], [ng-reflect-name="${key}"]`);
    if (invalid) {
      element.classList.add('error-container');
    } else {
      element.classList.remove('error-container');
    }
  }

  private setErrorMessage(key: string, value?: any, patternKey?: string) {
    // for validations who have requiredValue
    const requiredValue = (value) ? this.getValueByRegexFromObject(value, requiredRegex) : null;
    this.errorMessage = (key === 'pattern') ? this.patternMatchExpression(value, patternKey) : this.getMessage(key, requiredValue);
  }

  private patternMatchExpression(value: any, patternKey?: string): string {
    let errorMessage = '';
    const regExpDefault = Object.entries(regEx).find(([_, val]) => val === value.requiredPattern);
    const regeExp = (regExpDefault) ? new RegExp(regExpDefault[1]) : new RegExp(value.requiredPattern);
    const messageKey = (regExpDefault) ? regExpDefault[0] : patternKey;
    if (!regeExp.test(value.actualValue)) {
      errorMessage = this.getMessageFromPattern(messageKey);
    }
    return errorMessage;
  }

  private getValueByRegexFromObject(obj, regex: RegExp) {
    return (Object.entries(obj).find(([key, _]) => regex.test(key))[1]) as string;
  }

  private getMessage(key: string, param?: string): string {
    return (param) ? this.errorMessages[key].replace('{{param}}', param) : this.errorMessages[key];
  }

  private getMessageFromPattern(key: string) {
    return this.errorMessages.pattern[key];
  }
}
