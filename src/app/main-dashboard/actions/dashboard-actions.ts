import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/model/product.model';

export enum dashboardAction {
  loadProduct = '[Main Page] Load all products',
  showProduct = '[Main Page] show product in other page'
}

export const loadProduct = createAction(
  dashboardAction.loadProduct
);

export const showProduct = createAction(
  dashboardAction.showProduct, props<{ product: Product }>()
);

