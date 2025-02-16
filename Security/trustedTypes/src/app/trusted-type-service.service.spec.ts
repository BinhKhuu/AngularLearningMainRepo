import { TestBed } from '@angular/core/testing';

import { TrustedTypeServiceService } from './trusted-type-service.service';

describe('TrustedTypeServiceService', () => {
  let service: TrustedTypeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrustedTypeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
