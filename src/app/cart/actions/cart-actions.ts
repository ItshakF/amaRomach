import { UpdateStr } from '@ngrx/entity/src/models';
import { createAction, props } from '@ngrx/store';
import { ProductInCart } from 'src/app/model/product-in-cart.model';
import { Product } from 'src/app/model/product.model';


export enum cartActions {
  AddProduct = '[Cart State] add a product to cart',
  RemoveProduct = '[Cart State] remove a product from cart',
  UpdateQuantity = '[Cart State] update the quantity of product in cart',
  Checkout = '[Cart State] do checkout to all product',
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
  cartActions.Checkout, props<{ cart: UpdateStr<Product>[] }>()
);
