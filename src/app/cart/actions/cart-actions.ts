import {createAction, props} from '@ngrx/store';
import {Product} from 'src/app/model/product.model';
import {CartProduct} from 'src/app/model/cart-product.model';
import {ProductInCart} from '../reducer/cart-reducer';

export enum cartActions {
  AddProduct = '[Main Page] add a product to cart',
  RemoveProduct = '[Modal] remove a product from cart',
  UpdateQuantity = '[Modal] update the quantity of product in cart',
  Checkout = '[Modal] do checkout to all product',
  ResetCart = '[Modal] checkout reset',
}

export const addProduct = createAction(
  cartActions.AddProduct, props<{ product: Product }>()
);

export const removeProduct = createAction(
  cartActions.RemoveProduct, props<{ productName: string }>()
);

export const updateQuantity = createAction(
  cartActions.UpdateQuantity, props<{ updateProduct: ProductInCart }>()
);

export const checkout = createAction(
  cartActions.Checkout, props<{ cart: ProductInCart[] }>()
);

export const resetCart = createAction(
  cartActions.ResetCart
)
