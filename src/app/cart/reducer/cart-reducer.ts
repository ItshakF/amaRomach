import { createReducer, on, createSelector, Action, createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import * as cartActions from '../actions/cart-actions';

export interface ProductInCart {
  productName: string;
  productQuantity: number;
}

export interface CartState extends EntityState<ProductInCart> { }

export function selectCartProductName(cartProduct: ProductInCart) {
  return cartProduct.productName;
}

export const cartAdapter = createEntityAdapter<ProductInCart>({
  selectId: selectCartProductName
});

export const initialCartState = cartAdapter.getInitialState();

export const cartKey = 'cart';

const cartReducer = createReducer(
  initialCartState,
  on(cartActions.addProduct, (state, { product }) => {
    return cartAdapter.addOne({ productName: product.name, productQuantity: 1 }, state);
  }),
  on(cartActions.removeProduct, (state, { productName }) => {
    return cartAdapter.removeOne(productName, state);
  }),
  on(cartActions.updateQuantity, (state, { updateProduct }) => {
    return cartAdapter.updateOne({
      id: updateProduct.productName,
      changes: { productQuantity: updateProduct.productQuantity }
    }, state);
  }),
  on(cartActions.checkout, (state) => {
    return cartAdapter.removeAll(state);
  }),
);

export const selectCartState = createFeatureSelector<CartState>(cartKey);

const {
  selectAll,
  selectTotal,
} = cartAdapter.getSelectors();

export const selectAllCart = createSelector(
  selectCartState,
  selectAll
);

export const selectCartSize = createSelector(
  selectCartState,
  selectTotal
);

export function reducer(state: CartState, action: Action) {
  return cartReducer(state, action);
}
