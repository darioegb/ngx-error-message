import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
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
  @Input() control: AbstractControl;
  @Input() patternKey?: string;
  private formControlName: string;

  constructor(private errorMessageService: NgxErrorMessageService) {}

  ngOnInit() {
    this.formControlName = this.getFormControlName();
  }

  isNotValid(): boolean {
    const invalid = this.errorMessageService.isNotValid(this.control);
    this.toggleErrorContainer(invalid, this.formControlName);
    return invalid;
  }

  getErrorMessage(): string {
    return this.errorMessageService.getErrorMessage(
      this.control,
      this.patternKey
    );
  }

  private getFormControlName(): string {
    const formGroup = this.control.parent.controls;
    return Object.keys(formGroup).find(
      (name) => this.control === formGroup[name]
    );
  }

  private toggleErrorContainer(invalid: boolean, key: string) {
    const element = document.querySelector<HTMLElement>(
      `[formcontrolname='${key}'], [ng-reflect-name='${key}']`
    );
    const errorClass = 'error-container';
    invalid
      ? element.classList.add(errorClass)
      : element.classList.remove(errorClass);
  }
}
