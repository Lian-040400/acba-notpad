import { TestBed } from '@angular/core/testing';

import { DynamicCartDataService } from './dynamic-cart-data.service';

describe('DynamicCartDataService', () => {
  let service: DynamicCartDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicCartDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
