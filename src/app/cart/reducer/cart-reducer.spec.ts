import {CartState, reducer, initialCartState} from './cart-reducer';
import {mockProduct} from 'src/app/products.mock';
import {cartActions, addProduct, removeProduct, updateQuantity, resetCart} from '../actions/cart-actions';

export const mockCartState: CartState = {
  cartProduct: [{
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

describe('Cart reducer', () => {
  describe('[Main Page] add product', () => {
    it('should add a product', () => {
      const action = addProduct({product: mockProduct});
      const result = reducer(initialCartState, action);

      expect(result).toEqual({...initialCartState, cartProduct: [{productName: mockProduct.name, productQuantity: 1}]});
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

    expect(result).toEqual({...mockCartState, cartProduct: [{productName: mockProduct.name, productQuantity: 5}]});
  });

  it('should reset cart', () => {
    const action = resetCart();
    const result = reducer(initialCartState, action);

    expect(result).toEqual(initialCartState);
  });
});
