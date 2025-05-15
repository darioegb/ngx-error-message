import { Injectable, inject } from '@angular/core'
import { ValidationErrors } from '@angular/forms'

import { regEx, requiredRegex } from './ngx-error-message-constant'
import { TranslateService } from '@ngx-translate/core'
import { ErrorMessageConfig } from './ngx-error-message-interfaces'
import { ERROR_MESSAGE_CONFIG } from './ngx-error-message.token'

@Injectable()
export class NgxErrorMessageService {
  private readonly config = inject<ErrorMessageConfig>(ERROR_MESSAGE_CONFIG)
  private readonly translate = inject(TranslateService, { optional: true })

  getErrorMessage(
    controlErrors: ValidationErrors,
    patternKey?: string,
    fieldName?: string,
  ) {
    const lastError = Object.entries(controlErrors).pop()
    if (!lastError) {
      return ''
    }

    const [errorKey, errorValue] = lastError

    if (typeof errorValue === 'boolean') {
      return this.getMessage(errorKey, fieldName)
    }

    if (errorKey === 'pattern') {
      const patternErrorKey = this.patternMatchExpression(
        errorValue,
        patternKey,
      )
      return this.getMessage(patternErrorKey, fieldName)
    }
    const requiredValue = this.getValueByRegexFromObject(
      errorValue,
      requiredRegex,
    )
    return this.getMessage(errorKey, fieldName, requiredValue)
  }

  private patternMatchExpression(
    value: Record<string, unknown>,
    patternKey?: string,
  ): string {
    const pattern = value['requiredPattern'] as string
    const regExpDefault = Object.entries(regEx).find(
      ([, val]) => val.toString() === pattern,
    )
    return `${this.config.patternsPrefix}.${regExpDefault ? regExpDefault[0] : patternKey}`
  }

  private getValueByRegexFromObject(
    obj: Record<string, unknown>,
    regex: RegExp,
  ): string {
    const [, findValue] =
      Object.entries(obj).find(([key]) => regex.test(key)) ?? []
    return findValue as string
  }

  private interpolateMessage(
    message: string,
    params: Record<string, string>,
  ): string {
    return message.replace(/\{\{(\w+)\}\}/g, (_, key) => params[key] ?? '')
  }

  private getNestedMessage(
    obj: Record<string, unknown>,
    path: string,
  ): string | undefined {
    return path
      .split('.')
      .reduce(
        (acc, key) => acc && (acc[key] as never),
        obj,
      ) as unknown as string
  }

  private getMessage(key: string, fieldName?: string, param?: string): string {
    const options = {
      ...(fieldName && { fieldName }),
      ...(param && { param }),
    }
    if (Object.keys(this.config.errorMessages!).length > 0) {
      const messageTemplate =
        this.getNestedMessage(this.config.errorMessages!, key) ?? ''
      return this.interpolateMessage(messageTemplate, options)
    }

    return param || fieldName
      ? this.translate?.instant(
          `${this.config.validationsPrefix}.${key}`,
          options,
        )
      : this.translate?.instant(`${this.config.validationsPrefix}.${key}`)
  }
}
