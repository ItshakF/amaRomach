import { createReducer, on, createSelector, Action, createFeatureSelector } from '@ngrx/store';
import * as cartActions from '../actions/cart-actions';
import { State } from 'src/app/main-dashboard/reducers/dashboard-reducer';

export interface ProductInCart {
  productName: string;
  productQuantity: number;
}

export interface CartState {
  cartProduct: ProductInCart[];
}

export const initialCartState: CartState = {
  cartProduct : []
};

export const cartKey = 'cart';

const cartReducer = createReducer(
  initialCartState,
  on(cartActions.addProduct, (state , { product }) => ({
    ...state, cartProduct: [...state.cartProduct, {productName : product.name, productQuantity : 1}]
  })),
  on(cartActions.removeProduct, (state, { productName }) => ({
    ...state, cartProduct: [...state.cartProduct.filter(product => product.productName !== productName)]
  })),
  on(cartActions.updateQuantity, (state, { index, quantity }) => ({
    ...state,
     cartProduct: [
                    ...state.cartProduct.slice(0, index),
                    {...state.cartProduct[index], cartProduct : state.cartProduct[index].productQuantity = quantity},
                    ...state.cartProduct.slice(index + 1),
                  ]
  })),
);

export const selectFeature =  createFeatureSelector<CartState>(cartKey);

export const cartState =  createSelector(
  selectFeature,
  (state: CartState) => state.cartProduct
);

export const selectCartSize = createSelector(
  selectFeature,
  (state: CartState) => state.cartProduct.length
);

export function reducer(state: CartState, action: Action) {
  return cartReducer(state, action);
}
