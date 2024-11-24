import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000'; // Cambia esto según la URL de tu API.

  constructor(private http: HttpClient) {}

  // Obtener un usuario por ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}`);
  }

  // Obtener todos los usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/`);
  }

  // Registrar un usuario
  signUp(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/signUp`, data);
  }

  // Iniciar sesión
  login(email: string , password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Eliminar un usuario por ID
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/${id}`);
  }

  // Actualizar un usuario
  updateUser(id: number, data: FormData): Observable<any> {
    return this.http.patch(`${this.apiUrl}/account/${id}`, data);
  }
}
