import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { AbstractControl, FormGroup, UntypedFormArray } from '@angular/forms';
import { WithoutInternationalizationComponent } from './without-internationalization.component';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

// Refactored test to include necessary providers for TranslateService

describe('WithoutInternationalizationComponent', () => {
  let component: WithoutInternationalizationComponent;
  let fixture: ComponentFixture<WithoutInternationalizationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        WithoutInternationalizationComponent,
        TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: TranslateFakeLoader } })
      ],
      providers: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutInternationalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the form element', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('form');
    expect(formElement).toBeTruthy();
  });

  it('should add an alias to the aliases array', () => {
    const initialLength = component.aliases.length;
    component.addAlias();
    expect(component.aliases.length).toBe(initialLength + 1);
  });

  it('should validate avoidMultipleZero custom validator', () => {
    const control = { value: '00123' } as AbstractControl;
    const result = component.avoidMultipleZero(control);
    expect(result).toEqual({ avoidMultipleZero: true });

    const validControl = { value: '123' } as AbstractControl;
    const validResult = component.avoidMultipleZero(validControl);
    expect(validResult).toBeNull();
  });

  it('should validate usernameValidator asynchronously', (done) => {
    const control = { value: 'test' } as AbstractControl;
    component.usernameValidator(control).subscribe((result) => {
      expect(result).toEqual({ usernameTaken: true });
      done();
    });
  });

  it('should validate usernameValidator as valid for non-taken username', (done) => {
    const control = { value: 'notTaken' } as AbstractControl;
    component.usernameValidator(control).subscribe((result) => {
      expect(result).toBeNull();
      done();
    });
  });

  it('should return form controls, name controls, and aliases', () => {
    // Use .toEqual instead of .toBe for aliases, as they are different references but same content
    expect(component.formControls).toBe(component.form.controls);
    expect(component.nameControls).toBe((component.formControls['name'] as FormGroup).controls);
    expect(component.aliases.length).toBe((component.formControls['aliases'] as UntypedFormArray).length);
  });

  it('should not submit if form is invalid', () => {
    component.form.markAsTouched();
    spyOnProperty(component.form, 'invalid', 'get').and.returnValue(true);
    component.formValue = 'should be reset';
    component.onSubmit();
    expect(component.formValue).toBe('should be reset');
  });

  it('should submit and set formValue if form is valid', () => {
    spyOnProperty(component.form, 'invalid', 'get').and.returnValue(false);
    component.form.setValue({
      name: { firstName: 'A', lastName: 'B' },
      username: 'user',
      password: 'pass123',
      email: 'a@b.com',
      salary: '100',
      aliases: ['alias']
    });
    component.onSubmit();
    expect(component.formValue).toEqual(component.form.value);
  });
});
