import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';
import { stringify } from 'querystring';
@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // Obtener todas las plantas de un usuario
  getPlantsByUser(userId: number): Observable<any[]> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/plants`, { headers });
  }

  // Obtener una planta específica
  getPlantById(userId: number, plantId: number): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/${userId}/plants/${plantId}`, { headers });
  }

  // Crear una nueva planta
  createPlant(
    userId: number,
    name: string,
    description: string,
    hora_de_riego: string,
    category: string,
    tipo: string,
    img: File | null
  ): Observable<any> {
    const formData = new FormData();
    
    formData.append('name', name.trim());
    formData.append('description', description.trim());
    formData.append('hora_de_riego', hora_de_riego.trim());
    formData.append('category', category.trim());
    formData.append('tipo', tipo.trim());

    if (img) {
        formData.append('img', img);
    }

    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Debug
    formData.forEach((value, key) => {
        console.log(`${key}:`, value);
    });

    return this.http.post(`${this.apiUrl}/${userId}/plants`, formData, { 
        headers: headers
    }).pipe(
        catchError(error => {
            console.error('Error detallado:', error.error);
            return throwError(() => error);
        })
    );
  }

  // Actualizar una planta
  updatePlant(userId: number, plantId: number, data: any): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${userId}/plants/${plantId}`, data, { headers });
  }

  // Eliminar una planta
  deletePlant(userId: number, plantId: number): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${userId}/plants/${plantId}`, { headers });
  }
}
