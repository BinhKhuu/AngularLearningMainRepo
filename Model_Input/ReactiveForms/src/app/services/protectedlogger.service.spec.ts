import { TestBed } from '@angular/core/testing';

import { ProtectedloggerService } from './protectedlogger.service';

describe('ProtectedloggerService', () => {
  let service: ProtectedloggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtectedloggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
