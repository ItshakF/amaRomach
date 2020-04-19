import { TestBed } from '@angular/core/testing';

import { ProductFileReaderService } from './product-file-reader.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ProductFileReaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ProductFileReaderService, HttpClient, HttpHandler]
  }));

  it('should be created', () => {
    const service: ProductFileReaderService = TestBed.get(ProductFileReaderService);
    expect(service).toBeTruthy();
  });
});
