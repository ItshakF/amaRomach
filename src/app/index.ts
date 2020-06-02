import { ActionReducerMap } from '@ngrx/store';
import { cartKey, cartReducer as cartReducer } from './cart/reducer/cart-reducer';
import { productKey, reducer as productReducer } from './main-dashboard/reducers/dashboard-reducer';


export const reducers: ActionReducerMap<any> = {
  [productKey]: productReducer,
  [cartKey]: cartReducer,
};
