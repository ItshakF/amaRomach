import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { ProductInCart } from 'src/app/model/product-in-cart.model';
import { Product } from 'src/app/model/product.model';
import * as dashboardActions from '../actions/dashboard-actions';

export interface State {
  products: Product[];
}

export const initialState: State = {
  products: []
};

export const productKey = 'products';


const dashboardReducer = createReducer(
  initialState,
  on(dashboardActions.sucessLoad, (state, { payload }) => ({
    ...state, products: payload
  })),
  on(dashboardActions.checkout, (state, { cart }) => ({
    ...state, products: [...state.products.map(product => {
      if (product.limit) {
        const productToModify: ProductInCart = cart.find((productToFound: ProductInCart) =>
          productToFound.productName === product.name);
        if (productToModify) {
          return { ...product, limit: product.limit - productToModify.productQuantity };
         }
      }
      return { ...product };
    })]
  }))
);

export const selectProductFeature = createFeatureSelector<State>(productKey);

export const productFeatureState = (state: State) => state;

export const stateProducts = createSelector(
  selectProductFeature,
  (state: State) => state.products
);

export const selectProduct = createSelector(
  selectProductFeature,
  (state: State, productName: string) => state.products.find(product => product.name === productName)
);

// export const selectState =  createSelector(stateProducts)

export function reducer(state: State, action: Action) {
  return dashboardReducer(state, action);
}
