import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/model/product.model';
import { CartProduct } from 'src/app/model/cart-product.model';
import { ProductInCart } from '../reducer/cart-reducer';

export enum cartActions {
  addProduct = '[Main Page] add a product to cart',
  removeProduct = '[Modal] remove a product from cart',
  updateQuantity = '[Modal] update the quantity of product in cart',
  checkout = '[Modal] do checkout to all product'
}

export const addProduct = createAction(
  cartActions.addProduct, props<{ product: Product }>()
);

export const removeProduct = createAction(
  cartActions.removeProduct, props<{ productName: string }>()
);

export const updateQuantity = createAction(
  cartActions.updateQuantity, props<{ index: number, quantity: number }>()
);

export const checkout = createAction(
  cartActions.checkout, props<{ cart: CartProduct[] }>()
);

