import { TestBed } from '@angular/core/testing';

import { SwsErpService } from './sws-erp.service';

describe('SwsErpService', () => {
  let service: SwsErpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwsErpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
