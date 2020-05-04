import { mockProduct, mockProducts, mockProductsAfterCheckout } from 'src/app/products.mock';
import { State, reducer, initialState } from './dashboard-reducer';
import * as productAction from '../actions/dashboard-actions';

export const mockProductInCart: State = {
  products: [mockProduct]
};

export const mockProductState: State = {
  products: mockProducts
};

describe('default', () => {
  it('should return init state', () => {
    const action = { type: 'NOOP' } as any;
    const result = reducer(undefined, action);

    expect(result).toBe(initialState);
  });
});

describe('Product reducer', () => {
  it('should load products', () => {
    const action = productAction.sucessLoad({ payload: mockProducts });
    const result = reducer(initialState, action);

    expect(result).toEqual({ ...initialState, products: mockProducts });
  });

  it('should apply checkout on products', () => {
    const action = productAction.checkout({ cart: [{ productName: mockProduct.name, productQuantity: 1 }] });
    const result = reducer(mockProductState, action);

    expect(result).toEqual({ products: mockProductsAfterCheckout });
  });

});
