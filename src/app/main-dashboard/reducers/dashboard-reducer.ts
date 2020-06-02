import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Product } from 'src/app/model/product.model';
import * as dashboardActions from '../actions/dashboard-actions';

export interface ProductState extends EntityState<Product> { }

export interface DashboardProduct {
  product: Product;
  isInCart: boolean;
}

export function selectProductName(product: Product): string {
  return product.name;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: selectProductName,
});

export const initialState = adapter.getInitialState();

export const productKey = 'products';


const dashboardReducer = createReducer(
  initialState,
  on(dashboardActions.sucessLoad, (state, { payload }) => {
    return adapter.setAll(payload, state);
  }),
  on(dashboardActions.checkout, (state, { cart }) => {
    return adapter.updateMany(cart, state);
  }),
);

export const getProductState = createFeatureSelector<ProductState>(productKey);

const {
  selectEntities,
  selectAll,
} = adapter.getSelectors();

export const selectAllProducts = createSelector(
  getProductState,
  selectEntities
);

export const selectAllState = createSelector(
  getProductState,
  selectAll
);

export const selecProducts = selectEntities;

export function reducer(state: ProductState, action: Action) {
  return dashboardReducer(state, action);
}
