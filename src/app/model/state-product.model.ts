import { Product } from './product.model';

export interface StateProduct {
  product: Product;
  isInCart: boolean;
}
