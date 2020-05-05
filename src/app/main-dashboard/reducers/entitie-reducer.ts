import { Product } from 'src/app/model/product.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action, createFeatureSelector } from '@ngrx/store';
import * as dashActions from '../actions/dashboard-actions';
import { CartProduct } from 'src/app/model/cart-product.model';

export const productAdapter = createEntityAdapter<Product>();
export interface State extends EntityState<Product> {}

export interface StoreState {
  products: Product[];
  cart: CartProduct[];
}

const defaultProduct = {
   ids: [],
  entities: {},
};


export function sortByName(a: Product, b: Product): number {
  return a.name.localeCompare(b.name);
}

export function selectProductName(a: Product): string {
  // In this case this would be optional since primary key is id
  return a.name;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: selectProductName,
  sortComparer: sortByName,
});

export const initialState = productAdapter.getInitialState(defaultProduct);

export const entityProductKey = 'entityProducts';


const entityProductReducer = createReducer(
    initialState,
    on(dashActions.sucessLoad, (state, { payload }) => {
      return adapter.addAll(payload, state);
    }),
);

export const getProductState = createFeatureSelector<Product>(entityProductKey);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = productAdapter.getSelectors();

export const selectAllProduct = selectAll;
export const selecProducts = selectEntities;

export function reducer(state: State | undefined, action: Action) {
    return entityProductReducer(state, action);
}

