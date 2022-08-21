import { TestBed } from '@angular/core/testing';

import { CmsAdminService } from './cms-admin.service';

describe('CmsAdminService', () => {
  let service: CmsAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmsAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
