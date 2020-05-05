import { Injectable } from '@angular/core';
import { ValidationErrors, FormControl } from '@angular/forms';

import { regEx } from './ngx-error-message-constant';
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

  toggleErrorContainer(invalid: boolean, key: string) {
    const input = document.querySelector<HTMLInputElement>(`[formcontrolname="${key}"]`);
    if (invalid) {
      input.classList.add('error-container');
    } else {
      input.classList.remove('error-container');
    }
  }

  /**
   * @description This method set error message for current key
   * @param key error key
   * @param value error value
   * @param patternKey custom pattern key
   */
  private setErrorMessage(key: string, value?: any, patternKey?: string) {
    // for validations who have requiredValue
    const requiredValue = this.getValueByRegexFromObject(value, regEx.requiredRegex);
    if (key === 'pattern') {
      this.errorMessage = this.patternMatchExpression(value, patternKey);
    } else {
      this.errorMessage = this.getMessage(key, requiredValue);
    }
  }

  /**
   * @description This method check if error value match with some pattern expresion,
   * In case to success get error message for that pattern
   * @param value errorValue
   * @param patternKey custom pattern key
   * @returns string
   */
  private patternMatchExpression(value: any, patternKey?: string): string {
    let errorMessage = '';
    const patternMap = {
      [this.getStringFromRegex(regEx.phoneNumber.source)]: {
        validate: regEx.phoneNumber,
        message: 'phoneNumber'
      },
      [this.getStringFromRegex(regEx.email.source)]: {
        validate: regEx.email,
        message: 'email'
      },
      [this.getStringFromRegex(regEx.websiteUrl.source)]: {
        validate: regEx.websiteUrl,
        message: 'websiteUrl'
      },
      [this.getStringFromRegex(regEx.alphabet.source)]: {
        validate: regEx.alphabet,
        message: 'alphabet'
      },
      [this.getStringFromRegex(regEx.numeric.source)]: {
        validate: regEx.numeric,
        message: 'numeric'
      },
      [this.getStringFromRegex(regEx.alphaNumeric.source)]: {
        validate: regEx.alphaNumeric,
        message: 'alphaNumeric'
      },
      [this.getStringFromRegex(regEx.ip.source)]: {
        validate: regEx.ip,
        message: 'ip'
      }
    };

    const patternType = patternMap[value.requiredPattern];
    if (patternType && !patternType.validate.test(value.actualValue)) {
      errorMessage = this.getMessageFromPattern(patternType.message);
    } else if (!new RegExp(value.requiredPattern).test(value.actualValue)) {
      errorMessage = this.getMessageFromPattern(patternKey);
    }

    return errorMessage;
  }

  private getStringFromRegex(regex: string) {
    return '/' + regex + '/';
  }

  private getValueByRegexFromObject(obj, regex: RegExp) {
    const re = new RegExp(regex);
    for (const key in obj) {
      if (re.test(key)) {
        return obj[key];
      }
    }
    return null;
  }

  private getMessage(key: string, param?: string): string {
    return (param) ? this.errorMessages[key].replace('{{param}}', param) : this.errorMessages[key];
  }

  private getMessageFromPattern(key: string) {
    return this.errorMessages.pattern[key];
  }
}
