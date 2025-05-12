import { TestBed } from '@angular/core/testing';

import { UnsecureApiService } from './unsecure-api.service';

describe('UnsecureApiService', () => {
  let service: UnsecureApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnsecureApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
