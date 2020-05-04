import {createAction, props} from '@ngrx/store';
import {Product} from 'src/app/model/product.model';
import {Observable} from 'rxjs';
import {CartProduct} from 'src/app/model/cart-product.model';
import {CartNameProduct} from 'src/app/model/cart-name-product';
import {ProductInCart} from 'src/app/cart/reducer/cart-reducer';

export enum dashboardAction {
  LoadProduct = '[Main Page] Load all products',
  SucessLoad = '[Main Page] sucess Load',
  FailLoad = '[Main Page] fail Load',
  Checkout = '[Main Page] checkout'
}

export const loadProduct = createAction(
  dashboardAction.LoadProduct
);

export const sucessLoad = createAction(
  dashboardAction.SucessLoad, props<{ payload: Product[] }>()
);

export const failLoad = createAction(
  dashboardAction.FailLoad
)

export const checkout = createAction(
  dashboardAction.Checkout, props<{ cart: ProductInCart[] }>()
);

