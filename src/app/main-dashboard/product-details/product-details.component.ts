import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Product } from '../../model/product.model';
import { ProductFileReaderService } from '../../services/product-file-reader.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent implements OnInit {

  product: Observable<Product>;

  constructor(private productFileReaderService: ProductFileReaderService, private activatedRoute
    : ActivatedRoute) {
  }

  ngOnInit() {
    this.product = this.getProductFromAnId();
  }

  private getProduct(productName: string): Observable<Product> {
    return this.productFileReaderService.getJSONListOfProducts()
      .pipe(map((productToTest: Product[]) => productToTest.find(product => product.name === productName)));
  }

  private getProductFromAnId(): Observable<Product> {
    return this.activatedRoute.params.pipe(switchMap(productName =>
      this.getProduct(productName.id)));
  }
}
