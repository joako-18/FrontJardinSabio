import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  private apiUrl = 'http://localhost:8000'; // Cambia esto a tu base URL

  constructor(private http: HttpClient) {}

  // Obtener publicaciones
  getPublications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/publications`);
  }

  // Crear publicación
  createPublication(id_user: number, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id_user}/publications/create`, formData);
  }

  // Eliminar publicación
  deletePublication(id_user: number, id_publication: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id_user}/publications/${id_publication}`);
  }
}
