import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        TranslateModule.forRoot(),
        FormsModule
      ],
      providers: [
        TranslateService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation links', () => {
    const navBrand = debugElement.nativeElement.querySelector('.navbar-brand');
    expect(navBrand).toBeTruthy();
    expect(navBrand.textContent).toContain('Ngx Error Message Showcase');
  });

  it('should change language when a language option is selected', () => {
    spyOn(component, 'changeLanguaje');

    const selectElement = debugElement.nativeElement.querySelector('#changeLanguaje');
    selectElement.dispatchEvent(new Event('change'));

    expect(component.changeLanguaje).toHaveBeenCalled();
  });

  it('should toggle the sidebar state', () => {
    spyOn(component['sidebarService'], 'toggleSidebar');

    component.toggleSidebar();

    expect(component['sidebarService'].toggleSidebar).toHaveBeenCalled();
  });
});
