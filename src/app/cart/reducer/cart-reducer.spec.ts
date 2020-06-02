import { UpdateStr } from '@ngrx/entity/src/models';
import { mockProduct } from 'src/app/products.mock';
import { Product } from '../../model/product.model';
import { addProduct, checkout, removeProduct } from '../actions/cart-actions';
import { cartReducer, CartState, initialCartState } from './cart-reducer';

export const productsToUpdate: UpdateStr<Product>[] = [{
  id: mockProduct.name,
  changes: {
    limit: 25
  }
}];

export const productToUpdate: CartState = {
  ids: [mockProduct.name],
  entities: {
    [mockProduct.name]: {
      productName: mockProduct.name,
      productQuantity: 5
    }
  }
};

export const mockCartState: CartState = {
  ids: [mockProduct.name],
  entities: {
    [mockProduct.name]: {
      productName: mockProduct.name,
      productQuantity: 1
    }
  }
};

describe('default', () => {
  it('should return init state', () => {
    const intialisationAction = { type: 'NOOP' } as any;
    const result = cartReducer(undefined, intialisationAction);

    expect(result).toBe(initialCartState);
  });
  it('should remove a product', () => {
    addProduct({ product: mockProduct });
    const removeProductAction = removeProduct({ productName: mockProduct.name });
    const result = cartReducer(initialCartState, removeProductAction);

    expect(result).toEqual(productToUpdate);
  });

  it('should reset cart', () => {
    const action = checkout({ cart: productsToUpdate });
    const result = cartReducer(initialCartState, action);

    expect(result).toEqual({ ...mockCartState, cartProduct: [{ productName: mockProduct.name, productQuantity: 5 }] });
  });

  it('should reset cart', () => {
    addProduct({ product: mockProduct });
    const checkoutAction = checkout({cart : productsToUpdate});
    const result = cartReducer(initialCartState, checkoutAction);

    expect(result).toEqual(initialCartState);
  });

});

