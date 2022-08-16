import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {
  TranslateModule,
  TranslateLoader
} from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxErrorMessageModule } from 'projects/ngx-error-message/src/public-api';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from './app.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientModule,
        TranslateModule.forRoot({
          defaultLanguage: 'en',
          useDefaultLang: true,
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
        FormsModule,
        ReactiveFormsModule,
        NgxErrorMessageModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should set name formGroup', () => {
    const firstName = component.nameControls['firstName'];
    const lastName = component.nameControls['lastName'];
    expect(firstName.valid).toBeFalsy();
    expect(lastName.valid).toBeFalsy();
    firstName.setValue(1234);
    expect(firstName.hasError('pattern')).toBeTruthy();
    firstName.setValue('John');
    expect(firstName.valid).toBeTruthy();
  });

  it('should add alias', () => {
    component.addAlias();
    const addedALias = component.aliases.controls[1];
    expect(addedALias.valid).toBeFalsy();
    addedALias.setValue('John%1');
    expect(addedALias.hasError('pattern')).toBeTruthy();
    addedALias.setValue('John1');
    expect(addedALias.valid).toBeTruthy();
  });

  it('should fail submit', () => {
    component.onSubmit();
    expect(component.form.valid).toBeFalsy();
  });

  it('should submit', () => {
    const form = component.form;
    form.patchValue({
      name: {
        firstName: 'John',
        lastName: 'Doe',
      },
      username: 'jd1',
      password: 123456,
      email: 'jd1@yopmail.com',
      aliases: ['monster'],
    });
    component.onSubmit();
    expect(form.valid).toBeTruthy();
  });

  it('should set salary', () => {
    const salary = component.formControls['salary'];
    salary.setValue('00200');
    expect(component.avoidMultipleZero(salary)?.avoidMultipleZero).toBeTruthy();
    salary.setValue('3000');
    expect(component.avoidMultipleZero(salary)).toBeUndefined();
  });
});
