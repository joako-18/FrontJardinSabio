import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

interface Vivero {
  id_nursery: number;
  info: {
    name: string;
    description: string;
  };
  ubication: string;
  img: string;
  id_manager: number;
}

@Injectable({
  providedIn: 'root',
})
export class NurseryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // Obtener viveros de un usuario
  getNurseries(userId: number): Observable<Vivero[]> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Vivero[]>(`${this.apiUrl}/${userId}/viveros`, { headers })
      .pipe(
        tap(response => console.log('Respuesta del servidor:', response)),
        catchError(error => {
          console.error('Error en el servicio:', error);
          return throwError(() => error);
        })
      );
  }

  // Crear un vivero
  createNursery(
    userId: number,
    name: string,
    description: string,
    ubication: string,
    img: File | null
  ): Observable<any> {
    const formData = new FormData();
    
    formData.append('name', name);
    formData.append('description', description);
    formData.append('ubication', ubication);
    
    if (img) {
      formData.append('img', img);
  }

    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Debug
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    return this.http.post(`${this.apiUrl}/${userId}/viveros`, formData, { headers });
  }

  // Eliminar un vivero
  deleteNursery(userId: number, nurseryId: number): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${userId}/viveros/${nurseryId}`, { headers });
  }
}
