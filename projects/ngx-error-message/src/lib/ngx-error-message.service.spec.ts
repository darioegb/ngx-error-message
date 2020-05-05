import { TestBed } from '@angular/core/testing';

import { NgxErrorMessageService } from './ngx-error-message.service';

describe('NgxErrorMessageService', () => {
  let service: NgxErrorMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxErrorMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
