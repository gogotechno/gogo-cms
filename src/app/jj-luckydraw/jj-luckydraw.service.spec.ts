import { TestBed } from '@angular/core/testing';

import { JjLuckydrawService } from './jj-luckydraw.service';

describe('JjLuckydrawService', () => {
  let service: JjLuckydrawService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JjLuckydrawService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
