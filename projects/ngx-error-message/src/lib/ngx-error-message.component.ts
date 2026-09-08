import {
  Component,
  Input,
  OnInit,
  ElementRef,
  Renderer2,
  DestroyRef,
  inject,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { NgControl } from '@angular/forms'
import { LangChangeEvent, TranslateService } from '@ngx-translate/core'
import { distinctUntilChanged } from 'rxjs'
import { ClassNames, ErrorWhenType } from './ngx-error-message-interfaces'
import { NgxErrorMessagePipe } from './ngx-error-message.pipe'

@Component({
  selector: 'ngx-error-message',
  template: `
    @if (hasError) {
      <small [class]="classNames.message">{{
        ngControl.errors | ngxErrorMessage: lang : patternKey : fieldName
      }}</small>
    }
  `,
  imports: [NgxErrorMessagePipe],
})
export class NgxErrorMessageComponent implements OnInit {
  @Input() classNames!: ClassNames
  @Input() fieldName!: string
  @Input() ngControl!: NgControl
  @Input() when!: ErrorWhenType | ErrorWhenType[]
  @Input() patternKey?: string

  protected lang?: string
  private readonly translate = inject(TranslateService, { optional: true })
  private readonly elementRef = inject(ElementRef)
  private readonly renderer = inject(Renderer2)
  private readonly destroyRef = inject(DestroyRef)
  private previousErrorState = false

  get hasError(): boolean {
    const invalid = Array.isArray(this.when)
      ? this.when.every((condition) => this.ngControl[condition])
      : this.ngControl[this.when]
    if (this.previousErrorState !== invalid) {
      this.previousErrorState = !!invalid
      this.updateErrorContainer(!!invalid)
    }
    return !!invalid
  }

  ngOnInit(): void {
    this.translate?.onLangChange
      .pipe(
        distinctUntilChanged(
          (a: LangChangeEvent, b: LangChangeEvent) => a.lang === b.lang,
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ lang }: LangChangeEvent) => (this.lang = lang))
  }

  private updateErrorContainer(invalid: boolean): void {
    const inputElement = this.elementRef.nativeElement.previousElementSibling
    if (!inputElement) {
      return
    }
    const errorClass = this.classNames.control
    invalid
      ? this.renderer.addClass(inputElement, errorClass)
      : this.renderer.removeClass(inputElement, errorClass)
  }
}
