import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  AbstractControl,
  UntypedFormArray,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged } from 'rxjs/operators';

import { regEx } from '../../../ngx-error-message/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ngx-error-message-showcase';
  languajes = [
    {
      key: 'English',
      value: 'en',
    },
    {
      key: 'Spanish',
      value: 'es',
    },
  ];
  languaje!: string;
  form!: UntypedFormGroup;
  formValue: unknown;

  constructor(private fb: UntypedFormBuilder, private translate: TranslateService) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: this.fb.group({
        firstName: [
          null,
          [Validators.required, Validators.pattern(regEx.alphabet)],
        ],
        lastName: [
          null,
          [Validators.required, Validators.pattern(regEx.alphabet)],
        ],
      }),
      username: [
        null,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z0-9.]+$'),
        ],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
          Validators.pattern(regEx.alphaNumeric),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      salary: [
        null,
        [Validators.pattern(regEx.numeric), this.avoidMultipleZero],
      ],
      aliases: this.fb.array([
        this.fb.control(null, [
          Validators.required,
          Validators.pattern(regEx.alphaNumeric),
        ]),
      ]),
    });

    // Only for delete form value is invalid
    this.form.statusChanges.pipe(distinctUntilChanged()).subscribe((status) => {
      if (status === 'INVALID') {
        this.formValue = null;
      }
    });

    const lang = localStorage.getItem('lang');
    this.languaje = lang ? lang : this.translate.defaultLang;
    this.translate.setDefaultLang(this.languaje);
  }

  get formControls() {
    return this.form.controls;
  }

  get nameControls() {
    return (this.formControls['name'] as UntypedFormGroup).controls;
  }

  get aliases() {
    return this.formControls['aliases'] as UntypedFormArray;
  }

  addAlias() {
    this.aliases.push(
      this.fb.control(null, [
        Validators.required,
        Validators.pattern(regEx.alphaNumeric),
      ])
    );
  }

  // Custom validator
  avoidMultipleZero(control: AbstractControl) {
    const value = control.value;
    const isZeros = value ? value.startsWith('00') : false;
    return isZeros ? { avoidMultipleZero: true } : undefined;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.formValue = this.form.value;
  }

  changeLanguaje() {
    this.translate.use(this.languaje);
    localStorage.setItem('lang', this.languaje);
  }
}
