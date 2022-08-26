import { TestBed } from '@angular/core/testing';

import { TastefullyGuard } from './tastefully.guard';

describe('TastefullyGuard', () => {
  let guard: TastefullyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TastefullyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
