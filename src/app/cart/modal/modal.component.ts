import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ComponentModalConfig } from 'ng2-semantic-ui';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { CartProduct } from '../../model/cart-product.model';
import * as cartActions from '../actions/cart-actions';
import * as cartReducer from '../reducer/cart-reducer';
import { getCart } from '../reducer/cart-reducer';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent extends ComponentModalConfig<null, void, void> implements OnInit {

  cartTotalPrice: Observable<number>;
  products: Observable<CartProduct[]>;

  constructor(private store: Store<cartReducer.CartState>) {
    super(ModalComponent);
  }

  ngOnInit(): void {
    this.isClosable = true;
    this.products = this.store.pipe(select(getCart));
    this.cartTotalPrice = this.store.pipe(select(cartReducer.getTotalPrice));
  }

  updatePrice(cartProduct: CartProduct) {
    const updateProduct: cartReducer.ProductInCart = {
      productName: cartProduct.product.name,
      productQuantity: cartProduct.amount
    };
    this.store.dispatch(cartActions.updateQuantity({ updateProduct }));
    this.cartTotalPrice = this.store.pipe(select(cartReducer.getTotalPrice));
  }

  removeFromCart(productName: string) {
    this.store.dispatch(cartActions.removeProduct({ productName }));
    this.cartTotalPrice = this.store.pipe(select(cartReducer.getTotalPrice));
  }

  checkout() {
    let productInCart: cartReducer.ProductInCart[] = [];
    this.store.pipe(select(cartReducer.selectCartProducts), first()).subscribe((products: cartReducer.ProductInCart[]) => {
      productInCart = products;
      this.store.dispatch(cartActions.checkout({ cart: productInCart }));
      this.store.dispatch(cartActions.resetCart());
    });
  }
}
