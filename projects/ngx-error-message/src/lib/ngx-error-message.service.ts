import { Injectable, inject } from '@angular/core'
import { ValidationErrors } from '@angular/forms'

import { regEx, requiredRegex } from './ngx-error-message-constant'
import {
  ErrorPriority,
  ResolvedErrorMessageConfig,
} from './ngx-error-message-interfaces'
import { ERROR_MESSAGE_CONFIG } from './ngx-error-message.token'
import { NGX_ERROR_MESSAGE_TRANSLATOR } from './ngx-error-message.translator'

@Injectable()
export class NgxErrorMessageService {
  private readonly config =
    inject<ResolvedErrorMessageConfig>(ERROR_MESSAGE_CONFIG)
  private readonly translator = inject(NGX_ERROR_MESSAGE_TRANSLATOR)

  getErrorMessage(
    controlErrors: ValidationErrors,
    patternKey?: string,
    fieldName?: string,
    errorPriority?: ErrorPriority[],
  ): string {
    const errorKey = this.pickErrorKey(
      controlErrors,
      errorPriority ?? this.config.errorPriority,
    )
    if (!errorKey) {
      return ''
    }

    const errorValue: unknown = controlErrors[errorKey]

    if (typeof errorValue === 'boolean') {
      return this.getMessage(errorKey, fieldName)
    }

    if (errorKey === 'pattern') {
      const patternErrorKey = this.patternMatchExpression(
        errorValue as Record<string, unknown>,
        patternKey,
      )
      return this.getMessage(patternErrorKey, fieldName)
    }
    const requiredValue = this.getValueByRegexFromObject(
      errorValue as Record<string, unknown>,
      requiredRegex,
    )
    return this.getMessage(errorKey, fieldName, requiredValue)
  }

  private pickErrorKey(
    controlErrors: ValidationErrors,
    priority: ErrorPriority[],
  ): string | undefined {
    return (
      priority.find((key) => key in controlErrors) ??
      Object.keys(controlErrors).pop()
    )
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
  ): string | undefined {
    const [, findValue] =
      Object.entries(obj).find(([key]) => regex.test(key)) ?? []
    // minLength/maxLength/min/max errors carry numbers, not strings.
    return findValue === undefined ? undefined : String(findValue)
  }

  private interpolateMessage(
    message: string,
    params: Record<string, string>,
  ): string {
    return message.replace(/\{\{(\w+)\}\}/g, (_, key) => params[key] ?? '')
  }

  private getNestedMessage(
    dict: Record<string, unknown>,
    path: string,
  ): string | undefined {
    const value = path
      .split('.')
      .reduce<unknown>(
        (acc, key) =>
          acc && typeof acc === 'object'
            ? (acc as Record<string, unknown>)[key]
            : undefined,
        dict,
      )
    return typeof value === 'string' ? value : undefined
  }

  private getMessage(key: string, fieldName?: string, param?: string): string {
    const options: Record<string, string> = {
      ...(fieldName && { fieldName }),
      ...(param !== undefined && { param }),
    }
    if (Object.keys(this.config.errorMessages).length > 0) {
      const messageTemplate =
        this.getNestedMessage(this.config.errorMessages, key) ?? ''
      return this.interpolateMessage(messageTemplate, options)
    }

    return this.translator.translate(
      `${this.config.validationsPrefix}.${key}`,
      options,
    )
  }
}
