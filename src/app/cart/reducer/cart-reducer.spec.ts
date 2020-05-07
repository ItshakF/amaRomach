import {CartState, reducer, initialCartState} from './cart-reducer';
import {mockProduct} from 'src/app/products.mock';
import {addProduct, removeProduct, updateQuantity, checkout} from '../actions/cart-actions';
import {Product} from '../../model/product.model';
import {UpdateStr} from '@ngrx/entity/src/models';

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
    const action = {type: 'NOOP'} as any;
    const result = reducer(undefined, action);

    expect(result).toBe(initialCartState);
  });
});

describe('Cart reducer', () => {
  describe('[Main Page] add product', () => {
    it('should add a product', () => {
      const action = addProduct({product: mockProduct});
      const result = reducer(initialCartState, action);

      expect(result).toEqual(mockCartState);
    });
  });

  it('should remove a product', () => {
    const action = removeProduct({productName: mockProduct.name});
    const result = reducer(initialCartState, action);

    expect(result).toEqual({...initialCartState});
  });

  it('should update a product', () => {
    const action = updateQuantity({updateProduct: {productName: mockProduct.name, productQuantity: 5}});
    const result = reducer(mockCartState, action);

    expect(result).toEqual(productToUpdate);
  });

  it('should reset cart', () => {
    const action = checkout({cart: productsToUpdate});
    const result = reducer(initialCartState, action);

    expect(result).toEqual(initialCartState);
  });
});
