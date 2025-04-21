import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  apiUrl: string = "http://localhost:8080"

  constructor(private http: HttpClient) {}

  cadastrarProduto(produto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/register`, produto, {
      responseType: 'text'
    });
  }

  listarProduto(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/products/list`)
  }

  buscar(nome: string):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/products/busca?name=${nome}`)

  }
}
