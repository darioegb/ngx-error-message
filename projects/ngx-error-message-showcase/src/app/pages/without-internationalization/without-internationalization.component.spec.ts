import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutInternationalizationComponent } from './without-internationalization.component';

describe('WithoutInternationalizationComponent', () => {
  let component: WithoutInternationalizationComponent;
  let fixture: ComponentFixture<WithoutInternationalizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithoutInternationalizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithoutInternationalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
