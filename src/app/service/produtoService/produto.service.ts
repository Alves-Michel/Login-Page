import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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
}
