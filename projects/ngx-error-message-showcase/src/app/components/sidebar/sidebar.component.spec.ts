import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SidebarService } from './sidebar.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({})
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all sidebar items', () => {
    const sidebarItems = fixture.debugElement.nativeElement.querySelectorAll('.nav-item');
    expect(sidebarItems.length).toBeGreaterThan(0);
  });

  it('should toggle the sidebar state when the service updates', () => {
    const sidebarService = TestBed.inject(SidebarService);
    sidebarService.toggleSidebar();
    fixture.detectChanges();

    expect(component.isCollapsed).toBeFalse();

    sidebarService.toggleSidebar();
    fixture.detectChanges();

    expect(component.isCollapsed).toBeTrue();
  });
});
