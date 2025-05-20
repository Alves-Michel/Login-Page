import { TestBed } from '@angular/core/testing';

import { SaleServiceService } from '../saleService/sale-service.service';

describe('SaleServiceService', () => {
  let service: SaleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
