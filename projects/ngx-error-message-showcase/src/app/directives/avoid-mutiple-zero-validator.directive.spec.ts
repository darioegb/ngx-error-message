import { AbstractControl } from '@angular/forms';
import { AvoidMultipleZeroValidatorDirective } from './avoid-mutiple-zero-validator.directive';

describe('AvoidMutipleZeroValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new AvoidMultipleZeroValidatorDirective();
    expect(directive).toBeTruthy();
  });

  it('should return null for valid input', () => {
    const directive = new AvoidMultipleZeroValidatorDirective();
    const control = { value: '123' } as AbstractControl;
    const result = directive.validate(control);
    expect(result).toBeNull();
  });

  it('should return an error object for invalid input', () => {
    const directive = new AvoidMultipleZeroValidatorDirective();
    const control = { value: '00123' } as AbstractControl; // Updated input to match validation logic
    const result = directive.validate(control);
    expect(result).toEqual({ avoidMultipleZero: true });
  });
});
