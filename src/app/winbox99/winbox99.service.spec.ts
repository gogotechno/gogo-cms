import { TestBed } from '@angular/core/testing';

import { Winbox99Service } from './winbox99.service';

describe('Winbox99Service', () => {
  let service: Winbox99Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Winbox99Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
