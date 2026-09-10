import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NgxErrorMessageComponent } from './ngx-error-message.component'

// The directive owns all the state (whether there's an error, what the
// message says); this component just renders whatever it's given. Its
// integration with a real form control is covered by
// ngx-error-message.directive.spec.ts.
describe('NgxErrorMessageComponent', () => {
  let fixture: ComponentFixture<NgxErrorMessageComponent>

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxErrorMessageComponent)
  })

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should render nothing when message is empty', () => {
    fixture.detectChanges()
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('small'),
    ).toBeNull()
  })

  it('should render the message with the given class, role and aria-live', () => {
    fixture.componentRef.setInput('message', 'This field is required.')
    fixture.componentRef.setInput('messageClass', 'my-error-class')
    fixture.detectChanges()

    const element = (fixture.nativeElement as HTMLElement).querySelector(
      'small',
    )
    expect(element?.textContent).toBe('This field is required.')
    expect(element?.classList.contains('my-error-class')).toBe(true)
    expect(element?.getAttribute('role')).toBe('alert')
    expect(element?.getAttribute('aria-live')).toBe('polite')
  })

  it('should default messageClass to error-message', () => {
    fixture.componentRef.setInput('message', 'Invalid.')
    fixture.detectChanges()

    expect(
      (fixture.nativeElement as HTMLElement)
        .querySelector('small')
        ?.classList.contains('error-message'),
    ).toBe(true)
  })
})
