import { TestBed } from '@angular/core/testing';

import { AuthServiceService } from './auth-service.service';

describe('CustomerAuthServiceService', () => {
  let service: AuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
