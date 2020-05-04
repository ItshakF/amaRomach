import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Product} from '../../model/product.model';
import {CartProduct} from '../../model/cart-product.model';

@Component({
  selector: 'app-modal-product-in-cart',
  templateUrl: './product-in-cart.component.html',
  styleUrls: ['./product-in-cart.component.less']
})
export class ProductInCartComponent implements OnInit {

  @Input() product: Product;
  @Input() amount: number;
  @Output() productEventPriceUpdate: EventEmitter<CartProduct> = new EventEmitter<CartProduct>();
  @Output() productEventRemoveProduct: EventEmitter<Product> = new EventEmitter<Product>();

  private productCount: number[];

  ngOnInit() {
    this.productCount = [];
    if (this.product.limit) {
      for (let listOfNums = 1; listOfNums <= this.product.limit; listOfNums++) {
        this.productCount.push(listOfNums);
      }
    }
  }

  changePrice(productQuantity: number) {
    this.productEventPriceUpdate.emit({product: this.product, amount: productQuantity});
  }

  removeProduct() {
    this.productEventRemoveProduct.emit(this.product);
  }

}
