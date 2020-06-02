import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as cartActions from '../../cart/actions/cart-actions';
import { CartState, selectAllCart } from '../../cart/reducer/cart-reducer';
import { Product } from '../../model/product.model';
import * as dashboardActions from '../actions/dashboard-actions';
import { DashboardProduct, ProductState, selectAllState } from '../reducers/dashboard-reducer';


@Component({
  selector: 'app-product-admin',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})

export class ProductsComponent implements OnInit {
  products: Observable<DashboardProduct[]>;
  @Output() productEvent: EventEmitter<Product>;

  constructor(private store: Store<{CartState: CartState, ProductState: ProductState }>) {
    this.productEvent = new EventEmitter<Product>();
  }

  ngOnInit() {
    this.store.dispatch(dashboardActions.loadProduct());

    this.products = combineLatest(
      this.store.pipe(select(selectAllState)),
      this.store.pipe(select(selectAllCart)))
      .pipe(map(([products, cartProduct]) => {
        return products.map(product => {
          if (cartProduct.find(prod => prod.productName === product.name)) {
            return { product, isInCart: true };
          } else {
            return { product, isInCart: false };
          }
        });
      }
      ));
  }


  addProduct(dashProduct: DashboardProduct) {
    this.store.dispatch(cartActions.addProduct({ product: dashProduct.product }));
  }

  removeProduct(product: string) {
    this.store.dispatch(cartActions.removeProduct({ productName: product }));
  }

}
