import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = environment.apiUrl; // Cambiar por la URL de tu API

  constructor(private http: HttpClient) {}

  getCart(userId: number, cartId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}/cart/${cartId}`);
  }

  addToCart(userId: number, productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${userId}/products/${productId}`, { quantity });
  }

  deleteCart(userId: number, cartId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}/cart/${cartId}`);
  }

  checkoutCart(userId: number, cartId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${userId}/cart/${cartId}`, {});
  }
}
