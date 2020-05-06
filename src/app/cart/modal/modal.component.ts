import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ComponentModalConfig } from 'ng2-semantic-ui';
import { Observable, combineLatest} from 'rxjs';
import { first } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { CartProduct } from '../../model/cart-product.model';
import * as cartActions from '../actions/cart-actions';
import { ProductInCart, selectCartProducts, CartState, } from '../reducer/cart-reducer';
import { stateProducts, State } from 'src/app/main-dashboard/reducers/dashboard-reducer';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less'],
})
export class ModalComponent extends ComponentModalConfig<null, void, void> implements OnInit {

  cartTotalPrice: number;
  products: CartProduct[];

  constructor(private store: Store<{ CartState: CartState, State: State}>) {
    super(ModalComponent);
  }

  ngOnInit(): void {
    this.isClosable = true;
    combineLatest(
      this.store.pipe(select(selectCartProducts)),
      this.store.pipe(select(stateProducts))).subscribe(
        ([cartProduct, products ]) => {
          this.products = [];
          this.cartTotalPrice = 0;
          return cartProduct.forEach(productInCart => {
            const productToAdd = products.find(product => product.name === productInCart.productName );
            if (productToAdd) {
              this.products.push({product : productToAdd, amount: productInCart.productQuantity});
              this.cartTotalPrice += productInCart.productQuantity * productToAdd.price;
            }
          });
        }
      );
  }

  updatePrice(cartProduct: ProductInCart) {
    this.store.dispatch(cartActions.updateQuantity({ updateProduct : cartProduct }));
  }

  removeFromCart(productName: string) {
    this.store.dispatch(cartActions.removeProduct({ productName }));
  }

  checkout() {
    let productInCart: ProductInCart[] = [];
    this.store.pipe(select(selectCartProducts), first()).subscribe((products: ProductInCart[]) => {
      productInCart = products;
      this.store.dispatch(cartActions.checkout({ cart: productInCart }));
    });
  }
}
