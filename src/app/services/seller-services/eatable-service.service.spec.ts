import { TestBed } from '@angular/core/testing';

import { EatableServiceService } from './eatable-service.service';

describe('EatableServiceService', () => {
  let service: EatableServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EatableServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
