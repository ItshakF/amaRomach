import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Product } from '../../model/product.model';
import { DashboardProduct } from '../reducers/dashboard-reducer';

@Component({
  selector: 'app-product-card',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less'],
})
export class ProductCardComponent implements OnInit {

  @Input() product: DashboardProduct;
  @Input() indexOfProduct;
  @Output() productAddEvent: EventEmitter<DashboardProduct> = new EventEmitter<DashboardProduct>();
  @Output() productRemoveEvent: EventEmitter<DashboardProduct> = new EventEmitter<DashboardProduct>();
  isDimmed: boolean;

  ngOnInit() {
    this.isDimmed = false;
  }


  addToCart() {
    this.product.isInCart = true;
    this.productAddEvent.emit(this.product);
  }

  removeFromCart() {
    this.product.isInCart = false;
    this.productRemoveEvent.emit(this.product);
  }
}
