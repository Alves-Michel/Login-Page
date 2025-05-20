import { ItemSale } from './item-sale.model';

export interface Sale {
  client: any; // substitua por `Client` se tiver
  cpfClient: string;
  total_sale: number;
  itemSales: ItemSale[];
}
