import { mockCart, mockProduct } from 'src/app/products.mock';
import { addProduct, checkout, removeProduct, updateQuantity } from '../actions/cart-actions';
import { cartReducer, CartState, initialCartState } from './cart-reducer';

export const mockCartState: CartState = {
  cartProducts: [{
    productName: mockProduct.name,
    productQuantity: 1
  }]
};

describe('default', () => {
  it('should return init state', () => {
    const intialisationAction = { type: 'NOOP' } as any;
    const result = cartReducer(undefined, intialisationAction);

    expect(result).toBe(initialCartState);
  });
});


it('should add a product', () => {
  const addProductAction = addProduct({ product: mockProduct });
  const result = cartReducer(initialCartState, addProductAction);

  expect(result).toEqual({ ...initialCartState, cartProduct: [{ productName: mockProduct.name, productQuantity: 1 }] });
});


it('should remove a product', () => {
  addProduct({ product: mockProduct });
  const removeProductAction = removeProduct({ productName: mockProduct.name });
  const result = cartReducer(initialCartState, removeProductAction);

  expect(result).toEqual({ ...initialCartState });
});

it('should update a product', () => {
  addProduct({ product: mockProduct });
  const updateQuantityAction = updateQuantity({ updateProduct: { productName: mockProduct.name, productQuantity: 5 } });
  const result = cartReducer(mockCartState, updateQuantityAction);

  expect(result).toEqual({ ...mockCartState, cartProduct: [{ productName: mockProduct.name, productQuantity: 5 }] });
});

it('should reset cart', () => {
  addProduct({ product: mockProduct });
  const checkoutAction = checkout(mockCart);
  const result = cartReducer(initialCartState, checkoutAction);

  expect(result).toEqual(initialCartState);
});
