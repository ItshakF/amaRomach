import { mockEntityProductState, mockEntityProductStateAfterCheckout, mockProducts } from 'src/app/products.mock';
import { productsToUpdate } from '../../cart/reducer/cart-reducer.spec';
import * as productAction from '../actions/dashboard-actions';
import { initialState, reducer } from './dashboard-reducer';


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

    expect(result).toEqual(mockEntityProductState );
  });

  it('should apply checkout on products', () => {
    const action = productAction.checkout({ cart: productsToUpdate});
    const result = reducer(mockEntityProductState, action);

    expect(result).toEqual( mockEntityProductStateAfterCheckout );
  });

});
