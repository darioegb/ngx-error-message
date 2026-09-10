import { Pipe, PipeTransform, inject } from '@angular/core'
import { ValidationErrors } from '@angular/forms'
import { ErrorPriority } from './ngx-error-message-interfaces'
import { NgxErrorMessageService } from './ngx-error-message.service'

/** For consumers rendering messages manually (e.g. via `exportAs`); the directive itself calls `NgxErrorMessageService` directly. */
@Pipe({
  name: 'ngxErrorMessage',
})
export class NgxErrorMessagePipe implements PipeTransform {
  private readonly errorMessageService = inject(NgxErrorMessageService)

  transform(
    value: ValidationErrors | null,
    patternKey?: string,
    fieldName?: string,
    errorPriority?: ErrorPriority[],
  ): string {
    if (!value) {
      return ''
    }
    return this.errorMessageService.getErrorMessage(
      value,
      patternKey,
      fieldName,
      errorPriority,
    )
  }
}
