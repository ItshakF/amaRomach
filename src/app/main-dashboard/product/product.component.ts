import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../../model/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less'],
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  @Input() isInCart;
  @Input() indexOfProduct;
  @Output() productAddEvent: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() productRemoveEvent: EventEmitter<Product> = new EventEmitter<Product>();
  isDimmed: boolean;

  ngOnInit() {
    this.isInCart = false;
    this.isDimmed = false;
  }


  addToCart() {
    this.productAddEvent.emit(this.product);
  }

  removeFromCart() {
    this.productRemoveEvent.emit(this.product);
  }
}
