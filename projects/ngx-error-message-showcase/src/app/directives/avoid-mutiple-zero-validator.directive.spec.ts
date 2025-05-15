import { AvoidMultipleZeroValidatorDirective } from './avoid-mutiple-zero-validator.directive';

describe('AvoidMutipleZeroValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new AvoidMultipleZeroValidatorDirective();
    expect(directive).toBeTruthy();
  });

  it('should return null for valid input', () => {
    const directive = new AvoidMultipleZeroValidatorDirective();
    const control = { value: '123' };
    const result = directive.validate(control as any);
    expect(result).toBeNull();
  });

  it('should return an error object for invalid input', () => {
    const directive = new AvoidMultipleZeroValidatorDirective();
    const control = { value: '00123' }; // Updated input to match validation logic
    const result = directive.validate(control as any);
    expect(result).toEqual({ avoidMultipleZero: true });
  });
});
