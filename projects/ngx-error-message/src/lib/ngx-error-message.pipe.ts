import { Pipe, PipeTransform, inject } from '@angular/core'
import { ValidationErrors } from '@angular/forms'
import { NgxErrorMessageService } from './ngx-error-message.service'

@Pipe({
  name: 'ngxErrorMessage',
})
export class NgxErrorMessagePipe implements PipeTransform {
  private readonly errorMessageService = inject(NgxErrorMessageService)
  private cachedData!: string
  private cachedError = ''
  private cachedLang = ''

  transform(
    value: ValidationErrors | null,
    lang?: string,
    patternKey?: string,
    fieldName?: string,
  ): string {
    if (!value) {
      return ''
    }
    if (lang !== this.cachedLang) {
      this.cachedLang = lang ?? ''
      this.cachedError = ''
    }
    const [lastErrorKey] = Object.keys(value).slice(-1)
    if (lastErrorKey !== this.cachedError) {
      this.cachedError = lastErrorKey
      this.cachedData = this.errorMessageService.getErrorMessage(
        value,
        patternKey,
        fieldName,
      )
    }
    return this.cachedData ?? ''
  }
}
