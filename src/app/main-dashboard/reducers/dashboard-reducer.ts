import { Product } from 'src/app/model/product.model';
import { createReducer, Action, on, createSelector } from '@ngrx/store';
import * as dashboardActions from '../actions/dashboard-actions';
import { Observable, of } from 'rxjs';

export interface State {
  products: Product[];
}
export const initialState: State = {
  products : []
};

export const productKey = 'products';


const dashboardReducer = createReducer(
  initialState,
  on(dashboardActions.sucessLoad, (state, { payload }) => ({
    ...state, products : payload
  }))
);

export const stateProducts = (state: State) => state.products;

// export const selectState =  createSelector(stateProducts)

export function reducer(state: State, action: Action) {
  return dashboardReducer(state, action);
}
