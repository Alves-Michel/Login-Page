import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from '../../pages/models/sale.model';


@Injectable({
  providedIn: 'root'
})
export class SaleServiceService {

  private apiUrl = 'http://localhost:8080/sales';

  constructor(private http: HttpClient) {}

  createSale(sale: Sale): Observable<any>{
    return this.http.post(`${this.apiUrl}/sales`, sale, {responseType: 'text'})
  }

  getSale(): Observable<any[]>{
    return this.http.get<any>(`${this.apiUrl}/list`);
  }

}
