import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductFileReaderService } from './product-file-reader.service';
import { mockProducts } from '../products.mock';

describe('ProductFileReaderService', () => {
  let httpTestingController: HttpTestingController;
  let service: ProductFileReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductFileReaderService]
    });

    // inject the service
    service = TestBed.get(ProductFileReaderService);
    httpTestingController = TestBed.get(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all the products', () => {
    service.getJSONListOfProducts().subscribe((products) => {
      expect(products).toBe(mockProducts);
    });

    const req = httpTestingController.expectOne('../assets/data/products.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
    httpTestingController.verify();
  });

});
