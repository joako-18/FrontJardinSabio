import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode'; // Importa jwtDecode correctamente

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token'); // Obtén el token desde localStorage
    if (!token) {
      return null;
    }
    try {
      const decoded: any = jwtDecode(token); // Usa jwtDecode para decodificar el token
      return decoded?.userId || null; // Devuelve el userId si existe en el token
    } catch (err) {
      console.error('Error al decodificar el token:', err);
      return null;
    }
  }
}
