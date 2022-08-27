import { TestBed } from '@angular/core/testing';

import { CustomerAuthServiceService } from './customer-auth-service.service';

describe('CustomerAuthServiceService', () => {
  let service: CustomerAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
