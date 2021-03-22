import {
  Directive,
  ViewContainerRef,
  OnInit,
  ComponentFactoryResolver,
  Input,
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { NgxErrorMessageComponent } from './ngx-error-message.component';

@Directive({
  selector: '[ngxErrorMessage]',
})
export class NgxErrorMessageDirective implements OnInit {
  @Input() control: FormControl;
  @Input() patternKey?: string;

  constructor(
    private resolver: ComponentFactoryResolver,
    private ngControl: NgControl,
    public container: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory(
      NgxErrorMessageComponent
    );
    const hostViewContainerRef = this.container;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(factory);

    componentRef.instance.control = this.ngControl.control;
    componentRef.instance.patternKey = this.patternKey;
  }
}
