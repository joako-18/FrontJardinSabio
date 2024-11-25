import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private apiUrl = 'https://glv39q1x-8000.use2.devtunnels.ms';

  constructor(private http: HttpClient) {}

  // Obtener todas las plantas de un usuario
  getPlantsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/plants`);
  }

  // Obtener una planta específica
  getPlantById(userId: number, plantId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}/plants/${plantId}`);
  }

  // Crear una nueva planta
  createPlant(userId: number, data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userId}/plants`, data);
  }

  // Actualizar una planta
  updatePlant(userId: number, plantId: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/plants/${plantId}`, data);
  }

  // Eliminar una planta
  deletePlant(userId: number, plantId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}/plants/${plantId}`);
  }
}
