import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Product } from '../../model/product.model';
import * as dashboardActions from '../actions/dashboard-actions';
import * as cartActions from '../../cart/actions/cart-actions';
import { DashboardProduct, ProductState, selectAllState, } from '../reducers/dashboard-reducer';
import { CartState, selectAllCart  } from '../../cart/reducer/cart-reducer';

@Component({
  selector: 'app-product-admin',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})

export class ProductsComponent implements OnInit {
  products: DashboardProduct[];
  @Output() productEvent: EventEmitter<Product>;

  constructor(private store: Store<{CartState: CartState, ProductState: ProductState }>) {
    this.productEvent = new EventEmitter<Product>();
  }

  ngOnInit() {
    this.store.dispatch(dashboardActions.loadProduct());

    combineLatest(this.store.pipe(select(selectAllState)),
      this.store.pipe(select(selectAllCart)))
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
    this.store.dispatch(cartActions.addProduct({ product: dashProduct.product }));
  }

  removeProduct(product: string) {
    this.store.dispatch(cartActions.removeProduct({ productName: product }));
  }

}
