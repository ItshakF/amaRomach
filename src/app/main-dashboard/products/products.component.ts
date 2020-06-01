import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateProduct } from 'src/app/model/state-product.model';
import * as cartActions from '../../cart/actions/cart-actions';
import { selectCartProducts } from '../../cart/reducer/cart-reducer';
import { Product } from '../../model/product.model';
import * as dashboardActions from '../actions/dashboard-actions';
import { stateProducts } from '../reducers/dashboard-reducer';


@Component({
  selector: 'app-product-admin',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.less']
})

export class ProductsComponent implements OnInit {
  products: Observable<StateProduct[]>;
  @Output() productEvent: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private store: Store<{State, CartState}>) {
  }

  ngOnInit() {
    this.store.dispatch(dashboardActions.loadProduct());

    this.products = combineLatest(
      this.store.pipe(select(stateProducts)),
      this.store.pipe(select(selectCartProducts)))
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


  addProduct(dashProduct: StateProduct) {
    const product = dashProduct.product;
    this.store.dispatch(cartActions.addProduct({ product }));
  }

  removeProduct(product: string) {
    this.store.dispatch(cartActions.removeProduct({ productName: product }));
  }

}
