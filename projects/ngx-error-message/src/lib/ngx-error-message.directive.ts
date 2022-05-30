import {
  Directive,
  ViewContainerRef,
  OnInit,
  Input,
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { NgxErrorMessageComponent } from './ngx-error-message.component';

@Directive({
  selector: '[ngxErrorMessage]',
})
export class NgxErrorMessageDirective implements OnInit {
  @Input() control!: FormControl;
  @Input() patternKey?: string;

  constructor(
    private ngControl: NgControl,
    public container: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    const hostViewContainerRef = this.container;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(NgxErrorMessageComponent);
    componentRef.instance.ngControl = this.ngControl;
    componentRef.instance.patternKey = this.patternKey;
  }
}
