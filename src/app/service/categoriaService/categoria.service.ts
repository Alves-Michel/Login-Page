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
  listarSubCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/subCategory/list`);
  }


  cadastrarCategoria(categoria: any): Observable<any> {
    return this.http.post('http://localhost:8080/categories/register', categoria, {
      responseType: 'text'
    });
  }

  cadastrarSubcategoria(subcategoria: { name: string, categoryId: string }): Observable<any> {
    return this.http.post('http://localhost:8080/subCategory/register', subcategoria,{
      responseType: 'text'
    });
  }
}
