import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductFileReaderService } from '../../services/product-file-reader.service';
import { Product } from '../../model/product.model';
import { ProductToCartService } from '../../services/product-to-cart.service';
import { Observable, Subject, of, combineLatest } from 'rxjs';
import { takeUntil, map, delay, tap, find } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
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
  products: Observable<Product[]>;
  trues: DashboardProduct[];
  dashProduct: Observable<DashboardProduct[]> = of([]);
  @Output() productEvent: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(private store: Store<dashboardReducer.State>) { }

  ngOnInit() {
    this.store.dispatch(dashboardActions.loadProduct());

    combineLatest(this.store.pipe(select(dashboardReducer.stateProducts)),
      this.store.pipe(select(cartReducer.cartState)))
      .subscribe(([products, cartProduct]) => {
        this.trues = [];
        return products.forEach(product => {
          if (cartProduct.find(prod => prod.productName === product.name)) {
            this.trues.push({ product, isInCart: true });
          } else {
            this.trues.push({ product, isInCart: false });
          }
        });
      }
      );
  }

  private getTextOfProducts(productName: string) { }

  addProduct(dashProduct: DashboardProduct) {
    const product = dashProduct.product;
    this.store.dispatch(cartActions.addProduct({ product }));
  }

  removeProduct(product: string) {
    this.store.dispatch(cartActions.removeProduct({ productName: product }));
  }

  checkout() {
    this.store.pipe(select(cartReducer.cartState)).pipe(
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
