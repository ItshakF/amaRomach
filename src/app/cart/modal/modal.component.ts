import { Component, OnInit, OnChanges, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ComponentModalConfig } from 'ng2-semantic-ui';
import { CartProduct } from '../../model/cart-product.model';
import { Product } from '../../model/product.model';
import { ProductToCartService } from '../../services/product-to-cart.service';
import { Observable, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as cartActions from '../actions/cart-actions';
import * as cartReducer from '../reducer/cart-reducer';
import { Store, select } from '@ngrx/store';
import * as dashboardReducer from '../../main-dashboard/reducers/dashboard-reducer';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less'],
  changeDetection :  ChangeDetectionStrategy.OnPush
})
export class ModalComponent extends ComponentModalConfig<null, void, void> implements OnInit {

  cartTotalPrice: Observable<number> = of(0);
  products: CartProduct[] = [];
  try: number;

  constructor(private productServices: ProductToCartService,
              private store: Store<cartReducer.CartState>,
              private cd: ChangeDetectorRef) {
    super(ModalComponent);
  }

  ngOnInit(): void {
    this.isClosable = true;

    combineLatest(this.store.pipe(select(dashboardReducer.stateProducts)),
      this.store.pipe(select(cartReducer.cartState)))
      .subscribe(([products, cartProduct]) => {
        this.products = [];
        return cartProduct.forEach(product => {
          const test = products.find(prod => prod.name === product.productName);
          if (test) {
            this.products.push({ product: test, amount: product.productQuantity });
          }
        });
      }
      );
    this.cartTotalPrice.subscribe(totalPrice => {
      this.try = 0;
      this.products.forEach(product => {
        this.try += product.amount * product.product.price;
        this.cd.markForCheck();
      }
      );
    });
  }

  updatePrice(cartProduct: CartProduct) {
    const index = this.products.findIndex(product => product.product.name === cartProduct.product.name);
    this.store.dispatch(cartActions.updateQuantity({index, quantity: cartProduct.amount}));
    // let index = 0;
    // this.products.pipe(map(products => {
    //   index = products.findIndex(product => product.product.name === cartProduct.product.name);
    // }));
    // this.store.dispatch(cartActions.updateQuantity({index, quantity: cartProduct.amount}));
    // this.productServices.updateTotalPrice(cartProduct);
    // this.cartTotalPrice = this.productServices.getCartTotalPrice();
  }

  removeFromCart(product: Product) {
    this.store.dispatch(cartActions.removeProduct({ productName : product.name}));
  }

  checkout() {
    this.store.dispatch(cartActions.checkout({cart : this.products}));
  }
}
