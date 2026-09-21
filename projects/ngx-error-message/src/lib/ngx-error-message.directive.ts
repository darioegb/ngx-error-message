import {
  ComponentRef,
  Directive,
  DestroyRef,
  OnInit,
  ViewContainerRef,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { NgControl } from '@angular/forms'
import { NgxErrorMessageComponent } from './ngx-error-message.component'
import {
  ClassNames,
  ErrorPriority,
  ErrorWhenType,
} from './ngx-error-message-interfaces'
import { NgxErrorMessageService } from './ngx-error-message.service'

let nextMessageId = 0

@Directive({
  selector: '[ngxErrorMessage]',
  exportAs: 'ngxErrorMessage',
  host: {
    '[class]': 'controlClass()',
    '[attr.aria-invalid]': 'hasError() ? "true" : null',
    '[attr.aria-describedby]': 'hasError() ? messageId : null',
  },
})
export class NgxErrorMessageDirective implements OnInit {
  readonly fieldName = input('', { alias: 'ngxErrorMessage' })
  readonly classNames = input<ClassNames>({
    control: 'error-container',
    message: 'error-message',
  })
  readonly patternKey = input<string>()
  readonly when = input<ErrorWhenType | ErrorWhenType[]>(['invalid', 'touched'])
  readonly errorPriority = input<ErrorPriority[]>()

  private readonly ngControl = inject(NgControl)
  private readonly container = inject(ViewContainerRef)
  private readonly errorMessageService = inject(NgxErrorMessageService)
  private readonly destroyRef = inject(DestroyRef)

  // Stable id linking the host control to its generated `<small>` via
  // `aria-describedby`, so assistive tech announces the association, not
  // just the `aria-live` region on its own.
  protected readonly messageId = `ngx-error-message-${nextMessageId++}`

  // `NgControl`'s invalid/touched/etc. getters aren't signals, so this is
  // bumped on every control event to force `hasError`/`message` to recompute.
  private readonly revision = signal(0)
  private componentRef?: ComponentRef<NgxErrorMessageComponent>

  readonly hasError = computed(() => {
    this.revision()
    const condition = this.when()
    return Array.isArray(condition)
      ? condition.every((c) => !!this.ngControl[c])
      : !!this.ngControl[condition]
  })

  protected readonly controlClass = computed(() =>
    this.hasError() ? this.classNames().control : '',
  )

  readonly message = computed(() => {
    // Read even though `hasError()` below already depends on it: `errors`
    // can change (e.g. `required` -> `email`) while `hasError()`'s boolean
    // output stays the same, and computed() only reruns on a value change.
    this.revision()
    return this.hasError()
      ? this.errorMessageService.getErrorMessage(
          this.ngControl.errors ?? {},
          this.patternKey(),
          this.fieldName(),
          this.errorPriority(),
        )
      : ''
  })

  constructor() {
    effect(() => {
      const message = this.message()
      if (!message && !this.componentRef) {
        return
      }
      this.componentRef ??= this.container.createComponent(
        NgxErrorMessageComponent,
      )
      this.componentRef.setInput('id', this.messageId)
      this.componentRef.setInput('message', message)
      this.componentRef.setInput('messageClass', this.classNames().message)
    })
  }

  ngOnInit(): void {
    // Signal Forms' compat `NgControl` (from `[formField]`) has `control`
    // but no `.events` - its getters already read real field signals, so
    // `hasError`/`message` stay reactive without this subscription.
    this.ngControl.control?.events
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.revision.update((value) => value + 1))
  }
}
