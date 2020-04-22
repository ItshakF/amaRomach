import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/model/product.model';
import { Observable } from 'rxjs';
import { CartProduct } from 'src/app/model/cart-product.model';
import { CartNameProduct } from 'src/app/model/cart-name-product';

export enum dashboardAction {
  loadProduct = '[Main Page] Load all products',
  sucessLoad = '[Main Page] sucess Load',
  checkout = '[Main Page] checkout'
}

export const loadProduct = createAction(
  dashboardAction.loadProduct
);

export const sucessLoad = createAction(
  dashboardAction.sucessLoad, props<{ payload: Product[] } >()
);

export const checkout = createAction(
  dashboardAction.checkout, props<{ cart: Observable<CartProduct[]> }>()
);

