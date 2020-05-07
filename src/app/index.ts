import { ActionReducerMap } from '@ngrx/store';

import { productKey, reducer as productReducer } from './main-dashboard/reducers/dashboard-reducer';
import { cartKey, reducer as cartReducer } from './cart/reducer/cart-reducer';

export const reducers: ActionReducerMap<any> = {
  [productKey]: productReducer,
  [cartKey]: cartReducer,
};
