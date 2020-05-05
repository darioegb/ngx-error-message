import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';


import { regEx } from '../../../ngx-error-message/src/lib/ngx-error-message-constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngx-error-message-showcase';
  form: FormGroup;
  formValue: any;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9.]+$')]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(regEx.alphaNumeric)]],
      email: [null, [Validators.required, Validators.email]],
      salary: [null, [Validators.pattern(regEx.numeric), this.avoidMultipleZero]]
    });

    // Only for delete form value is invalid
    this.form.statusChanges
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(status => {
        if (status === 'INVALID') {
          this.formValue = null;
        }
      });
  }

  get formControls() { return this.form.controls; }

  // Custom validator
  avoidMultipleZero(control: AbstractControl) {
    const value = control.value;
    const isZeros = (value) ? value.startsWith('00') : false;
    return isZeros ? { avoidMultipleZero: true } : null;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.formValue = this.form.value;
  }

}
