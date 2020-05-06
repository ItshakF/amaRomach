import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Product} from '../../model/product.model';
import {CartProduct} from '../../model/cart-product.model';
import { ProductInCart } from '../reducer/cart-reducer';

@Component({
  selector: 'app-modal-product-in-cart',
  templateUrl: './product-in-cart.component.html',
  styleUrls: ['./product-in-cart.component.less']
})
export class ProductInCartComponent implements OnInit {

  @Input() product: Product;
  @Input() amount: number;
  @Output() cartUpdateEvent: EventEmitter<ProductInCart>;
  @Output() removeProductEvent: EventEmitter<string>;

  private productCount: number[];

  constructor() {
    this.cartUpdateEvent = new EventEmitter<ProductInCart>();
    this.removeProductEvent = new EventEmitter<string>();
  }

  ngOnInit() {
    this.productCount = [];
    if (this.product.limit) {
      for (let listOfNums = 1; listOfNums <= this.product.limit; listOfNums++) {
        this.productCount.push(listOfNums);
      }
    }
  }

  updateQuantity(productQuantity: number) {
    this.cartUpdateEvent.emit({productName: this.product.name, productQuantity});
  }

  removeProduct() {
    this.removeProductEvent.emit(this.product.name);
  }

}
