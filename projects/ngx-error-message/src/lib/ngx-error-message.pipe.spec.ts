import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { ENGLISH_TRANSLATIONS } from '../test';
import { NgxErrorMessagePipe } from './ngx-error-message.pipe';
import { NgxErrorMessageService } from './ngx-error-message.service';

describe('NgxErrorMessagePipe', () => {
  let pipe: NgxErrorMessagePipe;
  let service: NgxErrorMessageService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations('en', ENGLISH_TRANSLATIONS),
      ],
      providers: [],
    });
    service = TestBed.inject(NgxErrorMessageService);
    pipe = new NgxErrorMessagePipe(service);
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
});
