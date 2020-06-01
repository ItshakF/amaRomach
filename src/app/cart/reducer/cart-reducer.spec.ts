import { mockCart, mockProduct } from 'src/app/products.mock';
import { addProduct, checkout, removeProduct, updateQuantity } from '../actions/cart-actions';
import { CartState, initialCartState, reducer } from './cart-reducer';

export const mockCartState: CartState = {
  cartProducts: [{
    productName: mockProduct.name,
    productQuantity: 1
  }]
};

describe('default', () => {
  it('should return init state', () => {
    const action = {type: 'NOOP'} as any;
    const result = reducer(undefined, action);

    expect(result).toBe(initialCartState);
  });
});


it('should add a product', () => {
      const action = addProduct({product: mockProduct});
      const result = reducer(initialCartState, action);

      expect(result).toEqual({...initialCartState, cartProduct: [{productName: mockProduct.name, productQuantity: 1}]});
    });


it('should remove a product', () => {
  const action1 = addProduct({ product: mockProduct });
  reducer(initialCartState, action1);
  const action = removeProduct({productName: mockProduct.name});
  const result = reducer(initialCartState, action);

  expect(result).toEqual({...initialCartState});
  });

it('should update a product', () => {
  const action1 = addProduct({ product: mockProduct });
  reducer(initialCartState, action1);
  const action = updateQuantity({updateProduct: {productName: mockProduct.name, productQuantity: 5}});
  const result = reducer(mockCartState, action);

  expect(result).toEqual({...mockCartState, cartProduct: [{productName: mockProduct.name, productQuantity: 5}]});
  });

it('should reset cart', () => {
  const action1 = addProduct({ product: mockProduct });
  reducer(initialCartState, action1);
  const action = checkout(mockCart);
  const result = reducer(initialCartState, action);

  expect(result).toEqual(initialCartState);
  });
