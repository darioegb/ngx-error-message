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

import { NgxErrorMessageService } from './ngx-error-message.service';

describe('NgxErrorMessageService', () => {
  let service: NgxErrorMessageService;
  let fb: FormBuilder;

  function initForm(): FormGroup {
    return fb.group({
      username: [
        null,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[a-zA-Z0-9.]+$'),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
    });
  }

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

  it('#isNotValid should return false when formControl is invalid', () => {
    const group = initForm();
    const control = group.controls.email as FormControl;
    expect(service.isNotValid(control)).toBeFalsy();
  });

  it('#getErrorMessage should return message when formControl is invalid', () => {
    const group = initForm();
    const control = group.controls.username as FormControl;
    expect(service.getErrorMessage(control)).toBe(
      ENGLISH_TRANSLATIONS.validations.required
    );
  });

  it('#getErrorMessage with param should return message when formControl is invalid', () => {
    const group = initForm();
    const control = group.controls.username as FormControl;
    control.setValue('thisIsAlongTestUserName');
    expect(service.getErrorMessage(control)).toContain('The maximum length allowed is' );
  });

  it('#getErrorMessage with patternKey should return message when formControl is invalid', () => {
    const group = initForm();
    const control = group.controls.username as FormControl;
    control.setValue('test$');
    expect(service.getErrorMessage(control, 'custom')).toBe(
      ENGLISH_TRANSLATIONS.validations.pattern.custom
    );
  });
});
