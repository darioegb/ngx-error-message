import { Component, OnInit, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { NgxErrorMessageService } from './ngx-error-message.service';

@Component({
  selector: 'ngx-error-message',
  template: `
    <div *ngIf='isNotValid()' class='error-message'>
      <small>{{ getErrorMessage() }}</small>
    </div>
  `,
  styles: [
    `
      .error-message {
        color: red;
      }
    `,
  ],
})
export class NgxErrorMessageComponent implements OnInit {
  @Input() ngControl: NgControl;
  @Input() patternKey?: string;
  private formControlName: string | number;

  constructor(private errorMessageService: NgxErrorMessageService) {}

  ngOnInit() {
    this.formControlName = this.ngControl.name;
  }

  isNotValid(): boolean {
    const invalid = this.errorMessageService.isNotValid(this.ngControl.control);
    this.toggleErrorContainer(invalid, this.formControlName);
    return invalid;
  }

  getErrorMessage(): string {
    return this.errorMessageService.getErrorMessage(
      this.ngControl.control,
      this.patternKey
    );
  }

  private toggleErrorContainer(invalid: boolean, key: string | number) {
    const element = document.querySelector<HTMLElement>(
      `[formcontrolname='${key}'], [ng-reflect-name='${key}']`
    );
    const errorClass = 'error-container';
    invalid
      ? element.classList.add(errorClass)
      : element.classList.remove(errorClass);
  }
}
