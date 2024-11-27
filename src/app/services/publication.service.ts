import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  private apiUrl = 'https://glv39q1x-8000.use2.devtunnels.ms';

  constructor(private http: HttpClient) {}

  // Obtener publicaciones
  getPublications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/publications`);
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
