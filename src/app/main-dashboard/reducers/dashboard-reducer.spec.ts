import { mockEntityProductState, mockEntityProductStateAfterCheckout, mockProducts } from 'src/app/products.mock';
import { productsToUpdate } from '../../cart/reducer/cart-reducer.spec';
import * as productAction from '../actions/dashboard-actions';
import { initialState, reducer } from './dashboard-reducer';


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

    expect(result).toEqual(mockEntityProductState );
  });

  it('should apply checkout on products', () => {
    const action = productAction.checkout({ cart: productsToUpdate});
    const result = reducer(mockEntityProductState, action);

    expect(result).toEqual( mockEntityProductStateAfterCheckout );
  });

});
