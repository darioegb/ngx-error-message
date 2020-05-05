import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxErrorMessageComponent } from './ngx-error-message.component';

describe('NgxErrorMessageComponent', () => {
  let component: NgxErrorMessageComponent;
  let fixture: ComponentFixture<NgxErrorMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxErrorMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
