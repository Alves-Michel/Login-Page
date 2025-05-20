import { Product } from './product.model';
  export interface ItemSale {
  amount_item: number;
  priceUnityItem: number;
  subTotalItem: number;
  product: Product;
  sale: any; // ou o tipo correto, se tiver
}

