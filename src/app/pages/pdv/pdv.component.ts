import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../service/produtoService/produto.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SaleServiceService } from '../../service/saleService/sale-service.service';
import { Product } from '../models/product.model';
import { ItemSale } from '../models/item-sale.model';
import { Sale } from '../models/sale.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pdv',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './pdv.component.html',
  styleUrl: './pdv.component.scss'
})
export class PdvComponent implements OnInit {
  product: Product[] = [];
  produtos: any [] = [];
  cart: ItemSale[] = [];
  total = 0;
  searchForm: FormGroup;
  clientCPF: string = '';
  currentProduct?: Product;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private saleService: SaleServiceService
  ){
      this.searchForm = this.fb.group({
        barcode :['']
      });
  }


  ngOnInit(): void {

  }

  buscar(): void {
  const barcode = this.searchForm.get('barcode')?.value;
  if (!barcode) return;

 this.produtoService.getProductByBarcode(barcode).subscribe(response => {
    let product: Product;

    if (Array.isArray(response)) {
      // Se a API retornou um array
      product = response[0];
    } else {
      // Se retornou um único objeto
      product = response;
    }

    if (product) {
      this.addToCart(product);
      this.searchForm.reset();
    } else {
      alert('Produto não encontrado');
    }
  }, error => {
    console.error('Erro ao buscar produto pelo código de barras', error);
  });
}

addToCart(product: any): void {
  console.log(product);
  const existing = this.cart.find(i => i.product.id_product === product.id_product);
  if (existing) {
    existing.amount_item += 1;
    existing.subTotalItem = existing.priceUnityItem * existing.amount_item;
  } else {
    this.cart.push({
      amount_item: 1,
      priceUnityItem: product.price_product,
      product: product,
      subTotalItem: product.price_product,
      sale: null
    });
  }
  console.log('Carrinho atual:', this.cart);
  this.calculateTotal();
}

  removeItem(index: number): void {
    this.cart.splice(index, 1);
    this.calculateTotal();
  }

  updateQuantity(index: number, change: number): void {
    const item = this.cart[index];
    item.amount_item += change;
    if (item.amount_item <= 0) {
      this.removeItem(index);
    } else {
      item.subTotalItem = item.priceUnityItem * item.amount_item;
    }
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.cart.reduce((sum, item) => {
      return sum + (item.priceUnityItem * item.amount_item);
    }, 0);
  }

  finalizeSale(): void {
    const sale: Sale = {
      client: null!,
      cpfClient: this.clientCPF || '',
      total_sale: this.total,
      itemSales: this.cart
    };

    this.saleService.createSale(sale).subscribe(() => {
      alert('Venda finalizada com sucesso!');
      this.cart = [];
      this.total = 0;
    });
  }

  cancelSale(): void {
    this.cart = [];
    this.total = 0;
  }



}
