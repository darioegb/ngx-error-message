import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { ENGLISH_TRANSLATIONS, SPANISH_TRANSLATIONS } from '../test';
import { NgxErrorMessagePipe } from './ngx-error-message.pipe';
import { NgxErrorMessageService } from './ngx-error-message.service';

describe('NgxErrorMessagePipe', () => {
  let pipe: NgxErrorMessagePipe;
  let service: NgxErrorMessageService;
  let translate: TranslateService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations({
          en: ENGLISH_TRANSLATIONS,
          es: SPANISH_TRANSLATIONS,
        }),
      ],
      providers: [],
    });
    service = TestBed.inject(NgxErrorMessageService);
    translate = TestBed.inject(TranslateService);
    pipe = new NgxErrorMessagePipe(service, translate);
  }));

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms form error to error message', () => {
    expect(
      pipe.transform({
        required: true,
      })
    ).toBe('The field is required.');
  });
  it('transforms form error to error message when change lang', () => {
    translate.use('es');
    expect(
      pipe.transform({
        required: true,
      })
    ).toBe('El campo es requerido.');
  });
});
