export interface Product {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly image: string;
  limit?: number;
}
