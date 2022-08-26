import { TestBed } from '@angular/core/testing';

import { TastefullyService } from './tastefully.service';

describe('TastefullyService', () => {
  let service: TastefullyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TastefullyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
