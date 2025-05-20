import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../pages/models/product.model';



@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  apiUrl: string = "http://localhost:8080"

  constructor(private http: HttpClient) {}

  cadastrarProduto(produto: Product): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/register`, produto, {
      responseType: 'text'
    });
  }

  listarProduto(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/products/list`)
  }

  buscar(nome: string):Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/products/busca?name=${nome}`)

  }
  getProductByBarcode(barcode: string): Observable<Product> {
  return this.http.get<Product>(`${this.apiUrl}/products/busca?code_product=${barcode}`);
}
}
