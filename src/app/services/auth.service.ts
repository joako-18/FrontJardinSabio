import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode'

interface LoginResponse {
  access_token: string;
  token_type: string;
  name: string;
  email: string;
  ubication: string;
  role: string;
  id_user: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://glv39q1x-8000.use2.devtunnels.ms/';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}login`, { email, password });
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) return null;

    return jwtDecode(token);
  }

  getUserRole(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.role : null;
  }
}
