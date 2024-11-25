import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://glv39q1x-8000.use2.devtunnels.ms'; // Cambia esto según la URL de tu API.

  constructor(private http: HttpClient) {}

  /**
   * Obtener un usuario por ID.
   * @param id - ID del usuario.
   * @returns Observable con la información del usuario.
   */
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}`);
  }

  /**
   * Obtener todos los usuarios.
   * @returns Observable con la lista de usuarios.
   */
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/`);
  }

  /**
   * Registrar un nuevo usuario.
   * @param name - Nombre del usuario.
   * @param email - Email del usuario.
   * @param password - Contraseña del usuario.
   * @param ubication - Ubicación del usuario (opcional).
   * @param role - Rol del usuario.
   * @param file - Imagen del usuario (opcional).
   * @returns Observable con la respuesta del servidor.
   */
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
      formData.append('ubication', ubication); // Se asume que ya está formateado como JSON válido
    }
    if (file) {
      formData.append('file', file);
    }

    return this.http.post(`${this.apiUrl}/signUp`, formData);
  }

  /**
   * Iniciar sesión.
   * @param email - Email del usuario.
   * @param password - Contraseña del usuario.
   * @returns Observable con el token de acceso y datos del usuario.
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  /**
   * Eliminar un usuario por ID.
   * @param id - ID del usuario a eliminar.
   * @returns Observable con el mensaje de confirmación.
   */
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/user/${id}`);
  }

  /**
   * Actualizar un usuario.
   * @param id - ID del usuario a actualizar.
   * @param data - Datos a actualizar (FormData).
   * @returns Observable con el mensaje de confirmación.
   */
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
