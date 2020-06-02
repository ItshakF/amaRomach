import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
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

export const cartReducer = createReducer(
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
