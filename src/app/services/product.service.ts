import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  // Crear un producto
  createProduct(userId: number, data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/${userId}`, data);
  }

  // Eliminar un producto
  deleteProduct(userId: number, productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${userId}/${productId}`);
  }

  // Obtener imagen de un producto
  getProductImage(imageId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/products/image/${imageId}`, {
      responseType: 'blob',
    });
  }
}
