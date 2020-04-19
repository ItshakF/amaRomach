import { Component, OnInit } from '@angular/core';
import { ComponentModalConfig } from 'ng2-semantic-ui';
import { CartProduct } from '../../model/cart-product.model';
import { Product } from '../../model/product.model';
import { ProductToCartService } from '../../services/product-to-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.less']
})
export class ModalComponent extends ComponentModalConfig<null, void, void> implements OnInit {

  private cartTotalPrice: number;
  private products: Observable<CartProduct[]>;

  constructor(private productServices: ProductToCartService) {
    super(ModalComponent);
  }

  ngOnInit(): void {
    this.isClosable = true;
    this.cartTotalPrice = 0;
    this.products = this.productServices.getProductCart();
  }

  updatePrice(cartProduct: CartProduct) {
    this.productServices.updateTotalPrice(cartProduct);
    this.cartTotalPrice = this.productServices.getCartTotalPrice();
  }

  removeFromCart(product: Product) {
    this.cartTotalPrice = this.productServices.getCartTotalPrice();
    this.productServices.removeProductFromCart(product);
  }

  showCurrentPrice(): number {
    return this.cartTotalPrice = this.productServices.getCartTotalPrice();
  }

  checkout() {
    this.productServices.checkout();
  }
}
