import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { NgxErrorMessageComponent } from './ngx-error-message.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxErrorMessageDirective } from './ngx-error-message.directive';
import { ENGLISH_TRANSLATIONS } from '../test';
import { NgxErrorMessagePipe } from './ngx-error-message.pipe';

@Component({
  template: ` <form [formGroup]='form' class='form-horizontal'>
    <div class='form-group col-lg-10'>
      <input
        type='email'
        formControlName='email'
        placeholder='Email'
        class='form-control'
        ngxErrorMessage
      />
    </div>
  </form>`,
})
class TestHostComponent implements OnInit {
  form!: FormGroup;
  formValue: unknown;

  constructor(private fb: FormBuilder) {}

  get formControls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }


  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.formValue = this.form.value;
  }
}

describe('NgxErrorMessageComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxErrorMessageComponent,
        NgxErrorMessageDirective,
        TestHostComponent,
        NgxErrorMessagePipe,
      ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations('en', ENGLISH_TRANSLATIONS),
      ],
      providers: [FormBuilder],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit should set error to formControl', () => {
    const control = component.form.controls['email'];

    control.markAsTouched();
    fixture.detectChanges();
    const errorElement = (fixture.nativeElement as HTMLElement).querySelector(
      '.error-message'
    );

    expect(control.errors).toBeDefined();
    expect(errorElement && errorElement.innerHTML).toBe(
      ENGLISH_TRANSLATIONS.validations.required
    );
  });
});
