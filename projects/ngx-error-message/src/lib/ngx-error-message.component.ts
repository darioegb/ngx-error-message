import { ChangeDetectionStrategy, Component, input } from '@angular/core'

@Component({
  selector: 'ngx-error-message',
  template: `
    @if (message()) {
      <small [class]="messageClass()" role="alert" aria-live="polite">{{
        message()
      }}</small>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxErrorMessageComponent {
  readonly message = input('')
  readonly messageClass = input('error-message')
}
