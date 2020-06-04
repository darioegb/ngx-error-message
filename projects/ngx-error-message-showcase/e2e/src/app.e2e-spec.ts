import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('ngx-error-message-showcase');
  });
  //  it('blur input firstName', () => {
  //   const firstName = component.nameControls.firstName;
  //   firstName.setValue(null);
  //   const inputEl = <HTMLInputElement>fixture.debugElement.nativeElement.querySelector('input[formcontrolname="firstName"]');
  //   inputEl.dispatchEvent(new InputEvent('blur'));
  //   fixture.detectChanges();
  //   expect(inputEl.classList).toContain('error-container');
  // });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
