import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8000'; // Cambiar por la URL de tu API

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products/`);
  }

  getProduct(userId: number, productId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}/products/${productId}`);
  }

  createProduct( userId: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/${userId}/products/`, formData);
  }

  deleteProduct(userId: number, productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}/products/${productId}`);
  }
}
