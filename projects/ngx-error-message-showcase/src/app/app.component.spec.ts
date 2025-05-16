import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { TranslateService } from '@ngx-translate/core'
import { ActivatedRoute } from '@angular/router'
import { NavbarComponent } from './components/navbar/navbar.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { MainContentComponent } from './components/main-content/main-content.component'
import { of } from 'rxjs'
import { TranslateTestingModule } from 'ngx-translate-testing'
import { ENGLISH_TRANSLATIONS, SPANISH_TRANSLATIONS } from '../test'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { provideHttpClientTesting } from '@angular/common/http/testing'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let translateService: TranslateService

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateTestingModule.withTranslations({
          en: ENGLISH_TRANSLATIONS,
          es: SPANISH_TRANSLATIONS,
        }).withDefaultLanguage('en'),
        NavbarComponent,
        SidebarComponent,
        MainContentComponent,
        AppComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
          },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    translateService = TestBed.inject(TranslateService)
    fixture.detectChanges()
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('should use the default language if no language is stored in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null)
    spyOn(translateService, 'use')

    component = fixture.componentInstance
    component.ngOnInit()
    fixture.detectChanges()

    expect(translateService.use).toHaveBeenCalledWith(
      translateService.defaultLang,
    )
  })

  it('should use the stored language from localStorage', () => {
    const storedLang = 'es'
    localStorage.setItem('lang', storedLang)
    spyOn(localStorage, 'getItem').and.returnValue(storedLang)
    spyOn(translateService, 'use')

    component = fixture.componentInstance
    component.ngOnInit()
    fixture.detectChanges()

    expect(translateService.use).toHaveBeenCalledWith(storedLang)
  })

  it('should render NavbarComponent', () => {
    const navbarElement = fixture.debugElement.nativeElement.querySelector('app-navbar');
    expect(navbarElement).toBeTruthy();
  });

  it('should render SidebarComponent', () => {
    const sidebarElement = fixture.debugElement.nativeElement.querySelector('app-sidebar');
    expect(sidebarElement).toBeTruthy();
  });

  it('should render MainContentComponent', () => {
    const mainContentElement = fixture.debugElement.nativeElement.querySelector('app-main-content');
    expect(mainContentElement).toBeTruthy();
  });
})
