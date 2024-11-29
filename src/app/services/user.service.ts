import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://glv39q1x-8000.use2.devtunnels.ms'; // Cambia esto según la URL de tu API.

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/`);
  }

  signUp(
    name: string,
    email: string,
    password: string,
    ubication: string | null,
    role: string,
    file: File | null
  ): Observable<any> {
    const formData = new FormData();

    // Campos obligatorios
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);

    // Campos opcionales
    if (ubication) {
      formData.append('ubication', JSON.stringify({ location: ubication }));
    } else {
      formData.append('ubication', ""); // O null si prefieres
    }

    // Adjuntar el archivo si existe
    if (file) {
      formData.append('file', file);
    }

    // Log the formData for debugging
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    return this.http.post<any>(`${this.apiUrl}/signUp`, formData);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/${id}`);
  }

  updateUser(
    id: number,
    name: string | null,
    email: string | null,
    ubication: string | null,
    role: string | null,
    file: File | null
  ): Observable<any> {
    const formData = new FormData();

    // Agregar campos si están presentes
    if (name) formData.append('name', name);
    if (email) formData.append('email', email);
    if (ubication) formData.append('ubication', ubication); // JSON.stringify() debe hacerse antes si aplica.
    if (role) formData.append('role', role);
    if (file) formData.append('file', file);

    return this.http.patch(`${this.apiUrl}/account/${id}`, formData);
  }
}
