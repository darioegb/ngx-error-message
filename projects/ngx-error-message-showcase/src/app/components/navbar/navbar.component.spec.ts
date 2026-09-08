import { TestBed, ComponentFixture } from '@angular/core/testing'
import { NavbarComponent } from './navbar.component'
import {
  provideTranslateService,
  provideTranslateLoader,
  TranslateNoOpLoader,
} from '@ngx-translate/core'
import { FormsModule } from '@angular/forms'
import { DebugElement } from '@angular/core'

describe('NavbarComponent', () => {
  let component: NavbarComponent
  let fixture: ComponentFixture<NavbarComponent>
  let debugElement: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, FormsModule],
      providers: [
        provideTranslateService({
          loader: provideTranslateLoader(TranslateNoOpLoader),
        }),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent)
    component = fixture.componentInstance
    debugElement = fixture.debugElement
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should use the stored language from localStorage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('es')

    const newFixture = TestBed.createComponent(NavbarComponent)
    newFixture.detectChanges()

    expect(newFixture.componentInstance.languaje).toBe('es')
  })

  it('should render navigation links', () => {
    const navBrand = debugElement.nativeElement.querySelector('.navbar-brand')
    expect(navBrand).toBeTruthy()
    expect(navBrand.textContent).toContain('Ngx Error Message Showcase')
  })

  it('should change language when a language option is selected', () => {
    vi.spyOn(component, 'changeLanguaje').mockReturnValue(undefined)

    const selectElement =
      debugElement.nativeElement.querySelector('#changeLanguaje')
    selectElement.dispatchEvent(new Event('change'))

    expect(component.changeLanguaje).toHaveBeenCalled()
  })

  it('should toggle the sidebar state', () => {
    vi.spyOn(component['sidebarService'], 'toggleSidebar').mockReturnValue(
      undefined,
    )

    component.toggleSidebar()

    expect(component['sidebarService'].toggleSidebar).toHaveBeenCalled()
  })
})
