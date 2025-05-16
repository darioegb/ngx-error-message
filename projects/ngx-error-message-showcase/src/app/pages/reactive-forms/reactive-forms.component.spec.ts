import { TestBed, ComponentFixture, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsComponent } from './reactive-forms.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { AbstractControl, FormBuilder, ValidationErrors } from '@angular/forms';
import { NgxErrorMessageDirective } from 'projects/ngx-error-message/src/public-api';

describe('ReactiveFormsComponent', () => {
  let component: ReactiveFormsComponent;
  let fixture: ComponentFixture<ReactiveFormsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsComponent,
        NgxErrorMessageDirective
      ],
      providers: [
        TranslateService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormsComponent);
    component = fixture.componentInstance;

    // Initialize the form property
    component.form = new FormBuilder().group({
      name: new FormBuilder().group({
        firstName: [''],
        lastName: ['']
      }),
      username: [''],
      password: [''],
      email: [''],
      salary: [''],
      aliases: new FormBuilder().array([''])
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.form.controls['username'].enable();
    const formValues = component.form.value;
    expect(formValues).toEqual({
      name: {
        firstName: '',
        lastName: ''
      },
      username: '',
      password: '',
      email: '',
      salary: '',
      aliases: ['']
    });
  });

  it('should mark the form as invalid if required fields are empty', () => {
    component.form.controls['name'].get('firstName')!.setValue('');
    component.form.controls['name'].get('lastName')!.setValue('');
    component.form.controls['username']!.setValue('');
    component.form.controls['password']!.setValue('');
    component.form.controls['email']!.setValue('');
    component.form.controls['salary']!.setValue('');

    expect(component.form.valid).toBeFalse();
  });

  it('should mark the form as valid if all required fields are filled', fakeAsync(() => {
    component.form.controls['name'].get('firstName')!.setValue('John');
    component.form.controls['name'].get('lastName')!.setValue('Doe');
    component.form.controls['username']!.setValue('johndoe');
    component.form.controls['password']!.setValue('password123');
    component.form.controls['email']!.setValue('john.doe@example.com');

    // Trigger validation
    fixture.detectChanges();

    // Simulate the passage of time for async validator
    tick(1000);
    fixture.detectChanges();

    expect(component.form.valid).toBeTrue();
  }));

  it('should call the onSubmit method when the form is submitted', () => {
    spyOn(component, 'onSubmit');

    const formElement = fixture.debugElement.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should return name controls', () => {
    const nameControls = component.nameControls;
    expect(nameControls).toBeTruthy();
    expect(nameControls['firstName']).toBeDefined();
    expect(nameControls['lastName']).toBeDefined();
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

  it('should validate usernameValidator asynchronously', fakeAsync(() => {
    const control = { value: 'test' } as AbstractControl;
    let result: ValidationErrors | null = null;

    component.usernameValidator(control).subscribe((res) => (result = res));
    tick(1000);
    expect(result).toEqual(jasmine.objectContaining({ usernameTaken: true }));

    const validControl = { value: 'validUser' } as AbstractControl;
    result = null;
    component.usernameValidator(validControl).subscribe((res) => (result = res));
    tick(1000);
    expect(result).toBeNull();
  }));

  it('should handle form submission', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    component.form.controls['name'].get('firstName')!.setValue('John');
    component.form.controls['name'].get('lastName')!.setValue('Doe');
    component.form.controls['username']!.setValue('johndoe');
    component.form.controls['password']!.setValue('password123');
    component.form.controls['email']!.setValue('john.doe@example.com');
    component.form.controls['salary']!.setValue('50000');

    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.formValue).toEqual(component.form.value);
  });
});
