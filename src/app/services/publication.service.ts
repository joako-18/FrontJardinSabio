import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // Obtener publicaciones
  getPublications(): Observable<any[]> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/publications`, { headers });
  }

  // Crear publicación
  createPublication(id_user: number, formData: FormData): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/${id_user}/publications/create`, formData, { headers });
  }

  // Eliminar publicación
  deletePublication(id_user: number, id_publication: number): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${id_user}/publications/${id_publication}`, { headers });
  }
}
