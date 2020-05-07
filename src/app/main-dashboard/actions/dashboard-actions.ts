import { createAction, props } from '@ngrx/store';
import { UpdateStr } from '@ngrx/entity/src/models';

import { Product } from 'src/app/model/product.model';

export enum dashboardAction {
  LoadProduct = '[Product State] Load all products',
  SucessLoad = '[Product State] sucess Load',
  FailLoad = '[Product State] fail Load',
  Checkout = '[Product State] checkout'
}

export const loadProduct = createAction(
  dashboardAction.LoadProduct
);

export const sucessLoad = createAction(
  dashboardAction.SucessLoad, props<{ payload: Product[] }>()
);

export const failLoad = createAction(
  dashboardAction.FailLoad
);

export const checkout = createAction(
  dashboardAction.Checkout, props<{ cart: UpdateStr<Product>[] }>()
);
