import {
  Directive,
  ViewContainerRef,
  OnInit,
  Input,
  inject,
  ComponentRef,
} from '@angular/core'
import { NgControl } from '@angular/forms'
import { NgxErrorMessageComponent } from './ngx-error-message.component'
import { ClassNames, ErrorWhenType } from './ngx-error-message-interfaces'

@Directive({
  selector: '[ngxErrorMessage]',
  standalone: false,
})
export class NgxErrorMessageDirective implements OnInit {
  @Input() set ngxErrorMessage(value: string) {
    this.#fieldName = value
    if (!this.#componentRef) {
      return
    }
    this.#componentRef.instance.fieldName = this.#fieldName
  }
  @Input() classNames: ClassNames = {
    control: 'error-container',
    message: 'error-message',
  }
  @Input() patternKey?: string
  @Input() when: ErrorWhenType | ErrorWhenType[] = ['invalid', 'touched']

  #fieldName: string = ''
  readonly #ngControl = inject(NgControl)
  readonly #container = inject(ViewContainerRef)
  #componentRef?: ComponentRef<NgxErrorMessageComponent>

  ngOnInit(): void {
    const hostViewContainerRef = this.#container
    if (!this.#componentRef) {
      hostViewContainerRef.clear()
      this.#componentRef = hostViewContainerRef.createComponent(
        NgxErrorMessageComponent,
      )
    }
    const instance = this.#componentRef.instance
    instance.classNames = this.classNames
    instance.ngControl = this.#ngControl
    instance.patternKey = this.patternKey
    instance.when = this.when
    instance.fieldName = this.#fieldName
  }
}
