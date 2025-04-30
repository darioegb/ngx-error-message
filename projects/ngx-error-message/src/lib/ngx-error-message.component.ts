import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  Renderer2,
  inject,
} from '@angular/core'
import { NgControl } from '@angular/forms'
import { LangChangeEvent, TranslateService } from '@ngx-translate/core'
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs'
import { ClassNames, ErrorWhenType } from './ngx-error-message-interfaces'

@Component({
  selector: 'ngx-error-message',
  template: `
    <small *ngIf="hasError" [class]="classNames.message">{{
      ngControl.errors | ngxErrorMessage: lang : patternKey : fieldName
    }}</small>
  `,
  standalone: false,
})
export class NgxErrorMessageComponent implements OnInit, OnDestroy {
  @Input() classNames!: ClassNames
  @Input() fieldName!: string
  @Input() ngControl!: NgControl
  @Input() when!: ErrorWhenType | ErrorWhenType[]
  @Input() patternKey?: string

  protected lang?: string
  readonly #translate = inject(TranslateService)
  readonly #elementRef = inject(ElementRef)
  readonly #renderer = inject(Renderer2)
  readonly #destroy$ = new Subject<void>()
  #previousErrorState = false

  get hasError(): boolean {
    const invalid = Array.isArray(this.when)
      ? this.when.every((condition) => this.ngControl[condition])
      : this.ngControl[this.when]
    if (this.#previousErrorState !== invalid) {
      this.#previousErrorState = !!invalid
      this.#updateErrorContainer(!!invalid)
    }
    return !!invalid
  }

  ngOnInit(): void {
    this.#translate.onLangChange
      .pipe(distinctUntilChanged(), takeUntil(this.#destroy$))
      .subscribe(({ lang }: LangChangeEvent) => (this.lang = lang))
  }

  ngOnDestroy(): void {
    this.#destroy$.next()
    this.#destroy$.complete()
  }

  #updateErrorContainer(invalid: boolean): void {
    const inputElement = this.#elementRef.nativeElement.previousElementSibling
    if (!inputElement) {
      return
    }
    const errorClass = this.classNames.control
    invalid
      ? this.#renderer.addClass(inputElement, errorClass)
      : this.#renderer.removeClass(inputElement, errorClass)
  }
}
