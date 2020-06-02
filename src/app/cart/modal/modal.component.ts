import { Component, OnInit } from '@angular/core';
import { UpdateStr } from '@ngrx/entity/src/models';
import { select, Store } from '@ngrx/store';
import { ComponentModalConfig } from 'ng2-semantic-ui';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductState, selectAllState } from 'src/app/main-dashboard/reducers/dashboard-reducer';
import { Product } from 'src/app/model/product.model';
import { CartProduct } from '../../model/cart-product.model';
import * as cartActions from '../actions/cart-actions';
import { CartState, ProductInCart, selectAllCart } from '../reducer/cart-reducer';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less'],
})
export class ModalComponent extends ComponentModalConfig<null, void, void> implements OnInit {

  cartTotalPrice: number;
  products: Observable<CartProduct[]>;

  constructor(private store: Store<{ CartState: CartState, State: ProductState}>) {
    super(ModalComponent);
  }

  ngOnInit(): void {
    this.isClosable = true;
    this.products = combineLatest(
      this.store.pipe(select(selectAllCart)),
      this.store.pipe(select(selectAllState))).pipe(map(
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
