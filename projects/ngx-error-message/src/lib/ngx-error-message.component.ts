import { Component, OnInit, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

import { StringOrNumberOrNull } from './ngx-error-message-interfaces';

@Component({
  selector: 'ngx-error-message',
  template: `
    <small *ngIf='isNotValid()' class='error-message'>{{
      ngControl.errors | ngxErrorMessage: patternKey
    }}</small>
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
  @Input() ngControl!: NgControl;
  @Input() patternKey?: string;
  private formControlName!: StringOrNumberOrNull;

  ngOnInit(): void {
    this.formControlName = this.ngControl.name;
  }

  isNotValid(): boolean {
    const control = this.ngControl.control;
    const invalid = (control && control.invalid && control.touched) || false;
    this.toggleErrorContainer(invalid, this.formControlName);
    return invalid;
  }

  private toggleErrorContainer(
    invalid: boolean,
    key: StringOrNumberOrNull
  ): void {
    const element = document.querySelector<HTMLElement>(
      `[formcontrolname='${key}'], [ng-reflect-name='${key}']`
    );
    const errorClass = 'error-container';
    invalid
      ? element?.classList.add(errorClass)
      : element?.classList.remove(errorClass);
  }
}
