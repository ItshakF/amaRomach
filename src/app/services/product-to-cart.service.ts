import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {Product} from '../model/product.model';
import {CartProduct} from '../model/cart-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductToCartService {
  ListOfProducts: Product[];
  private readonly cart: BehaviorSubject<CartProduct[]>;
  private cartTotalPrice;
  private readonly initialProductAmount;

  constructor() {
    this.ListOfProducts = [];
    this.cart = new BehaviorSubject<CartProduct[]>([]);
    this.cartTotalPrice = 0;
    this.initialProductAmount = 1;
  }

  addToCart(product: Product) {
    this.cart.next([...this.cart.getValue(), {product, amount: this.initialProductAmount}]);
    this.cartTotalPrice += product.price;
  }

  removeProductFromCart(product: Product) {
    const indexOfProduct: number = this.foundProduct(product);
    const currentCart: CartProduct[] = this.cart.getValue();
    this.updateTotalPrice({product, amount: 0});
    currentCart.splice(indexOfProduct, 1);
    this.cart.next(currentCart);
  }

  private foundProduct(product: Product): number {
    return this.cart.getValue().findIndex(a => a.product.name === product.name);
  }

  checkProduct(product: Product): boolean {
    return this.cart.getValue().some((a: CartProduct) => a.product.name === product.name);
  }

  getProductCart() {
    return this.cart;
  }

  getCartLength(): number {
    return this.cart.getValue().length;
  }

  updateTotalPrice(cartProduct: CartProduct) {
    const productToUpdate = this.cart.getValue()
      .find((currentProduct) => currentProduct.product.name === cartProduct.product.name);
    this.cartTotalPrice += productToUpdate.product.price * (cartProduct.amount - productToUpdate.amount);
    productToUpdate.amount = cartProduct.amount;
  }


  getCartTotalPrice(): number {
    return this.cartTotalPrice;
  }

  checkout() {
    this.cart.getValue().forEach((productInCart: CartProduct) => {
      if (productInCart.product.limit) {
        productInCart.product.limit -= productInCart.amount;
      }
    });
    this.cart.next([]);
    this.cartTotalPrice = 0;
  }
}
