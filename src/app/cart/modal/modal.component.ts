import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ComponentModalConfig } from 'ng2-semantic-ui';
import { combineLatest, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { State, stateProducts } from 'src/app/main-dashboard/reducers/dashboard-reducer';
import { ProductInCart } from 'src/app/model/product-in-cart.model';
import { CartProduct } from '../../model/cart-product.model';
import * as cartActions from '../actions/cart-actions';
import { CartState, selectCartProducts } from '../reducer/cart-reducer';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less'],
})
export class ModalComponent extends ComponentModalConfig<null, void, void> implements OnInit {

  cartTotalPrice: number;
  products: Observable<CartProduct[]>;

  constructor(private store: Store<{ CartState: CartState, State: State}>) {
    super(ModalComponent);
  }

  ngOnInit(): void {
    this.isClosable = true;
    this.products = combineLatest(
      this.store.pipe(select(selectCartProducts)),
      this.store.pipe(select(stateProducts))).pipe(map(
        ([cartProduct, products ]) => {
          this.cartTotalPrice = 0;
          return cartProduct.map(productInCart => {
            const productToAdd = products.find(product => product.name === productInCart.productName );
            if (productToAdd) {
              this.cartTotalPrice += productInCart.productQuantity * productToAdd.price;
              return { product : productToAdd, amount: productInCart.productQuantity};
            }
          });
        }
      ));
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
