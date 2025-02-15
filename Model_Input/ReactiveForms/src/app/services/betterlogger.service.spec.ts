import { TestBed } from '@angular/core/testing';

import { BetterloggerService } from './betterlogger.service';

describe('BetterloggerService', () => {
  let service: BetterloggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetterloggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
