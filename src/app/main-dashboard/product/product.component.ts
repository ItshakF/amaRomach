import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../../model/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less'],
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  @Input() isIncart: boolean;
  @Input() indexOfProduct;
  @Output() productAddEvent: EventEmitter<Product>;
  @Output() productRemoveEvent: EventEmitter<Product>;
  isDimmed: boolean;

  constructor() {
    this.productAddEvent = new EventEmitter<Product>();
    this.productRemoveEvent = new EventEmitter<Product>();
  }

  ngOnInit() {
    this.isDimmed = false;
  }

  addToCart() {
    this.productAddEvent.emit(this.product);
  }

  removeFromCart() {
    this.productRemoveEvent.emit(this.product);
  }
}
