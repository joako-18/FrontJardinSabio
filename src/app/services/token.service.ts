import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode'; // Importa jwtDecode correctamente

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  getToken(): string | null {
    return localStorage.getItem('token'); // Obtener el token del localStorage
  }

  getUserIdFromToken(): number | null {
    const token = this.getToken();
    console.log('Token obtenido:', token); // Log para depuración

    if (!token) {
      return null;
    }

    try {
      const decoded: any = jwtDecode(token); // Decodificar el token
      console.log('Token decodificado:', decoded); // Ver contenido decodificado

      if (this.isTokenExpired(decoded)) {
        this.clearToken(); // Eliminar el token si está expirado
        console.warn('El token ha expirado.');
        return null;
      }

      const userId = decoded?.sub ? parseInt(decoded.sub) : null; // Asegurar que el ID sea válido
      console.log('User ID extraído:', userId); // Verificar el ID extraído
      return userId;
    } catch (err) {
      console.error('Error al decodificar el token:', err); // Log de errores
      return null;
    }
  }

  private isTokenExpired(decodedToken: any): boolean {
    const expirationTime = decodedToken?.exp;
    if (!expirationTime) return false; // No hay expiración definida
    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    return expirationTime < currentTime; // Verificar expiración
  }

  clearToken(): void {
    localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
  }

  // Obtener el rol del usuario del token decodificado
getUserRoleFromToken(): string | null {
  const token = this.getToken();
  if (!token) {
    return null;
  }

  try {
    const decoded: any = jwtDecode(token); // Decodifica el token
    return decoded?.rol || null; // Cambia 'role' por la clave usada en tu token
  } catch (err) {
    console.error('Error al decodificar el token:', err);
    return null;
  }
}
}
