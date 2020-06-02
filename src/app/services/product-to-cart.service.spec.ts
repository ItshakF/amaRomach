import {TestBed} from '@angular/core/testing';

import {ProductToCartService} from './product-to-cart.service';

describe('ProductToCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductToCartService = TestBed.get(ProductToCartService);
    expect(service).toBeTruthy();
  });
});
