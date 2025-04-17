import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  apiUrl: string = "http://localhost:8080"


  constructor(private http: HttpClient) {}

  listarCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories/list`);
  }

  cadastrarCategoria(categoria: { name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories/register`, categoria);
  }

  cadastrarSubcategoria(subcategoria: { name: string, categoryId: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories/registerSubCategorias`, subcategoria);
  }
}
