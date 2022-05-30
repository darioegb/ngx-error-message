import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { ENGLISH_TRANSLATIONS } from '../test';
import { regEx } from './ngx-error-message-constant';

import { NgxErrorMessageService } from './ngx-error-message.service';

describe('NgxErrorMessageService', () => {
  let service: NgxErrorMessageService;
  let fb: FormBuilder;

  const initForm = (): FormGroup => fb.group({
      username: [
        null,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[a-zA-Z0-9.]+$'),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(regEx.phoneNumber)]],
    });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations('en', ENGLISH_TRANSLATIONS),
      ],
      providers: [FormBuilder],
    });
    fb = TestBed.inject(FormBuilder);
    service = TestBed.inject(NgxErrorMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getErrorMessage should return message when formControl is invalid', () => {
    const group = initForm();
    const control = group.controls['username'] as FormControl;
    expect(service.getErrorMessage(control.errors)).toBe(
      ENGLISH_TRANSLATIONS.validations.required
    );
  });

  it('#getErrorMessage with param should return message when formControl is invalid', () => {
    const group = initForm();
    const control = group.controls['username'] as FormControl;
    control.setValue('thisIsAlongTestUserName');
    expect(service.getErrorMessage(control.errors)).toContain(
      'The maximum length allowed is'
    );
  });

  it('#getErrorMessage with patternKey should return message when formControl is invalid', () => {
    const group = initForm();
    const control = group.controls['username'] as FormControl;
    control.setValue('test$');
    expect(service.getErrorMessage(control.errors, 'custom')).toBe(
      ENGLISH_TRANSLATIONS.validations.pattern.custom
    );
  });

  it('#getErrorMessage should return message when formControl is invalid and use default regex', () => {
    const group = initForm();
    const control = group.controls['phone'] as FormControl;
    control.setValue('isNotPhoneNumber');
    expect(service.getErrorMessage(control.errors)).toBe(
      ENGLISH_TRANSLATIONS.validations.pattern.phoneNumber
    );
  });
});
