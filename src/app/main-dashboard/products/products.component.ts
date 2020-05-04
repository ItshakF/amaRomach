import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Product } from '../../model/product.model';
import * as dashboardActions from '../actions/dashboard-actions';
import * as cartActions from '../../cart/actions/cart-actions';
import { DashboardProduct } from '../reducers/dashboard-reducer';
import * as dashboardReducer from '../reducers/dashboard-reducer';
import * as cartReducer from '../../cart/reducer/cart-reducer';

@Component({
  selector: 'app-product-admin',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})

export class ProductsComponent implements OnInit {
  products: DashboardProduct[];
  dashProduct: Observable<DashboardProduct[]> = of([]);
  @Output() productEvent: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private store: Store<dashboardReducer.State>) {
  }

  ngOnInit() {
    this.store.dispatch(dashboardActions.loadProduct());

    combineLatest(this.store.pipe(select(dashboardReducer.stateProducts)),
      this.store.pipe(select(cartReducer.selectCartProducts)))
      .subscribe(([products, cartProduct]) => {
        this.products = [];
        return products.forEach(product => {
          if (cartProduct.find(prod => prod.productName === product.name)) {
            this.products.push({ product, isInCart: true });
          } else {
            this.products.push({ product, isInCart: false });
          }
        });
      }
      );
  }


  addProduct(dashProduct: DashboardProduct) {
    const product = dashProduct.product;
    this.store.dispatch(cartActions.addProduct({ product }));
  }

  removeProduct(product: string) {
    this.store.dispatch(cartActions.removeProduct({ productName: product }));
  }

  checkout() {
    this.store.pipe(select(cartReducer.selectCartProducts)).pipe(
      map(cartProduct => cartProduct.forEach(productInCart =>
        this.dashProduct.pipe(map(productOrigin => {
          const tem = productOrigin.find(product =>
            product.product.name === productInCart.productName);
          if (tem.product.limit) {
            tem.product.limit -= productInCart.productQuantity;
          }
        }))
      )));
  }
}
