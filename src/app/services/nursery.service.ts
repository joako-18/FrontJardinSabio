import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NurseryService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  // Obtener viveros de un usuario
  getNurseries(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/viveros`);
  }

  // Crear un vivero
  createNursery(userId: number, data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/viveros/`, data);
  }

  // Eliminar un vivero
  deleteNursery(userId: number, nurseryId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/viveros/${nurseryId}`);
  }
}
