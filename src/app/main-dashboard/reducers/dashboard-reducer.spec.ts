import { mockProduct, mockProducts, mockProductsAfterCheckout } from 'src/app/products.mock';
import * as productAction from '../actions/dashboard-actions';
import { initialState, reducer, State } from './dashboard-reducer';

export const mockProductInCart: State = {
  products: [mockProduct]
};

export const mockProductState: State = {
  products: mockProducts
};

describe('default', () => {
  it('should return init state', () => {
    const intialisationAction = { type: 'NOOP' } as any;
    const result = reducer(undefined, intialisationAction);

    expect(result).toBe(initialState);
  });
});

describe('Product reducer', () => {
  it('should load products', () => {
    const sucessLoadAction = productAction.sucessLoad({ payload: mockProducts });
    const result = reducer(initialState, sucessLoadAction);

    expect(result).toEqual({ ...initialState, products: mockProducts });
  });

  it('should apply checkout on products', () => {
    const checkoutAction = productAction.checkout({ cart: [{ productName: mockProduct.name, productQuantity: 1 }] });
    const result = reducer(mockProductState, checkoutAction);

    expect(result).toEqual({ products: mockProductsAfterCheckout });
  });

});
