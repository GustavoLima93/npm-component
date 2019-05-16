import { TestBed } from '@angular/core/testing';

import { AuthSiV1Service } from './auth-si-v1.service';

describe('AuthSiV1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthSiV1Service = TestBed.get(AuthSiV1Service);
    expect(service).toBeTruthy();
  });
});
