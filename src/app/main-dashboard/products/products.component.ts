import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductFileReaderService } from '../../services/product-file-reader.service';
import { Product } from '../../model/product.model';
import { ProductToCartService } from '../../services/product-to-cart.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-admin',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})
export class ProductsComponent implements OnInit, OnDestroy {
  private products: Observable<Product[]>;
  private currentProduct: Product;
  private unsubscribe$: Subject<void>;
  @Output() productEvent: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private productFileReaderService: ProductFileReaderService,
              private productToCartService: ProductToCartService) {
  }

  ngOnInit() {
    this.unsubscribe$ = new Subject<void>();
    this.products = this.getTextOfProducts();
  }

  private getTextOfProducts() {
    return this.productFileReaderService.getJSONListOfProducts()
      .pipe(takeUntil(this.unsubscribe$));
  }

  checkIfProductIsInCart(product: Product): boolean {
    return this.productToCartService.checkProduct(product);
  }

  addProduct(product: Product) {
    this.currentProduct = product;
    this.productToCartService.addToCart(this.currentProduct);
  }

  removeProduct(product) {
    this.currentProduct = product;
    this.productToCartService.removeProductFromCart(this.currentProduct);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }
}
