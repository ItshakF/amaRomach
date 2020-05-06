import { createReducer, on, createSelector, Action, createFeatureSelector } from '@ngrx/store';

import * as cartActions from '../actions/cart-actions';

export interface ProductInCart {
  productName: string;
  productQuantity: number;
}

export interface CartState {
  cartProducts: ProductInCart[];
}

export const initialCartState: CartState = {
  cartProducts: []
};

export const cartKey = 'cart';

const cartReducer = createReducer(
  initialCartState,
  on(cartActions.addProduct, (state, { product }) => ({
    ...state, cartProducts: [...state.cartProducts, { productName: product.name, productQuantity: 1 }]
  })),
  on(cartActions.removeProduct, (state, { productName }) => ({
    ...state, cartProducts: state.cartProducts.filter((product: ProductInCart) => product.productName !== productName)
  })),
  on(cartActions.updateQuantity, (state, { updateProduct }) => ({
    ...state,
    cartProducts: state.cartProducts.map((product: ProductInCart) =>
      product.productName === updateProduct.productName ? {
        productName: updateProduct.productName, productQuantity: updateProduct.productQuantity
      } : product)
  })),
  on(cartActions.checkout, (state) => ({
    ...state, cartProduct: []
  }))
);

export const selectCartState = createFeatureSelector<CartState>(cartKey);

export const selectCartProducts = createSelector(
  selectCartState,
  (state: CartState) => state.cartProducts
);

export const selectCartSize = createSelector(
  selectCartState,
  (state: CartState) => state.cartProducts.length
);

export function reducer(state: CartState, action: Action) {
  return cartReducer(state, action);
}
