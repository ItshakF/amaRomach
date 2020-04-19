import { Product } from './product.model';

export interface CartProduct {
  product: Product;
  amount: number;
}
