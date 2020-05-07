import { Component, OnInit } from '@angular/core';
import { ComponentModalConfig } from 'ng2-semantic-ui';
import { combineLatest} from 'rxjs';
import { Store, select } from '@ngrx/store';
import { UpdateStr } from '@ngrx/entity/src/models';

import { CartProduct } from '../../model/cart-product.model';
import * as cartActions from '../actions/cart-actions';
import { ProductInCart, CartState, selectAllCart, } from '../reducer/cart-reducer';
import { selectAllState, ProductState } from 'src/app/main-dashboard/reducers/dashboard-reducer';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less'],
})
export class ModalComponent extends ComponentModalConfig<null, void, void> implements OnInit {

  cartTotalPrice: number;
  products: CartProduct[];

  constructor(private store: Store<{ CartState: CartState, State: ProductState}>) {
    super(ModalComponent);
  }

  ngOnInit(): void {
    this.isClosable = true;
    combineLatest(
      this.store.pipe(select(selectAllCart)),
      this.store.pipe(select(selectAllState))).subscribe(
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
    let productToUpdate: UpdateStr<Product>[];
    combineLatest(
      this.store.pipe(select(selectAllCart)),
      this.store.pipe(select(selectAllState))).subscribe(
        ([cartProduct, products]) => {
          productToUpdate = [];
          return cartProduct.forEach(productInCart => {
            const productToAdd = products.find(product => product.name === productInCart.productName);
            if (productToAdd.limit) {
              productToUpdate.push(
                {
                  id: productToAdd.name,
                  changes: {
                    limit: productToAdd.limit - productInCart.productQuantity
                  }
                });
            }
          });
        }
      );
    this.store.dispatch(cartActions.checkout({ cart: productToUpdate }));
  }
}
