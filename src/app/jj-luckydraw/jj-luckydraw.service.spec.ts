import { TestBed } from '@angular/core/testing';

import { JJLuckydrawService } from './jj-luckydraw.service';

describe('JJLuckydrawService', () => {
  let service: JJLuckydrawService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JJLuckydrawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
