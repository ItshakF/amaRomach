import { createReducer, on, createSelector, Action, createFeatureSelector } from '@ngrx/store';

import * as cartActions from '../actions/cart-actions';
import { State, selectProductFeature } from 'src/app/main-dashboard/reducers/dashboard-reducer';
import { Product } from 'src/app/model/product.model';

export interface ProductInCart {
  productName: string;
  productQuantity: number;
}

export interface CartState {
  cartProduct: ProductInCart[];
}

export const initialCartState: CartState = {
  cartProduct: []
};

export const cartKey = 'cart';

const cartReducer = createReducer(
  initialCartState,
  on(cartActions.addProduct, (state, { product }) => ({
    ...state, cartProduct: [...state.cartProduct, { productName: product.name, productQuantity: 1 }]
  })),
  on(cartActions.removeProduct, (state, { productName }) => ({
    ...state, cartProduct: state.cartProduct.filter((product: ProductInCart) => product.productName !== productName)
  })),
  on(cartActions.updateQuantity, (state, { updateProduct }) => ({
    ...state,
    cartProduct: state.cartProduct.map((product: ProductInCart) =>
      product.productName === updateProduct.productName ? {
        productName: updateProduct.productName, productQuantity: updateProduct.productQuantity
      } : product)
  })),
  on(cartActions.resetCart, (state) => ({
    ...state, cartProduct: []
  }))
);

export const selectCartState = createFeatureSelector<CartState>(cartKey);

export const selectCartProducts = createSelector(
  selectCartState,
  (state: CartState) => state.cartProduct
);

export const getViewOfCartProducts = createSelector(
  selectCartState, selectProductFeature, (cartState: CartState, productState: State) =>
  cartState.cartProduct.map(productToFound =>
    productState.products.find(product => product.name === productToFound.productName))
);

export const getCart = createSelector(
  selectCartState, selectProductFeature, (cartState: CartState, productState: State) =>
  cartState.cartProduct.map(productToFound => {
    return {
      product: productState.products.find(product => product.name === productToFound.productName),
      amount: productToFound.productQuantity
    };
  })
);

export const getTotalPrice = createSelector(
  selectCartState, getViewOfCartProducts, (state: CartState, products: Product[]) => {
    console.log(products);
    return products.reduce((totalPrice, data) => {
      const tot = data.price * state.cartProduct
        .find(product => product.productName === data.name).productQuantity + totalPrice;
      console.log(tot);
      console.log(state.cartProduct);
      return tot;
    }, 0);
  }
);

export const selectCartSize = createSelector(
  selectCartState,
  (state: CartState) => state.cartProduct.length
);

export function reducer(state: CartState, action: Action) {
  return cartReducer(state, action);
}

console.log();
