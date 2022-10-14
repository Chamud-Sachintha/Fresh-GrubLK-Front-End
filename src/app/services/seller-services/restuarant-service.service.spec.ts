import { TestBed } from '@angular/core/testing';

import { RestuarantServiceService } from './restuarant-service.service';

describe('RestuarantServiceService', () => {
  let service: RestuarantServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestuarantServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
