import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode'; // Importa jwtDecode correctamente

@Injectable({
  providedIn: 'root',
})

export class TokenService {

  // Obtener el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Obtener el userId del token decodificado
  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const decoded: any = jwtDecode(token); // Decodifica el token
      // Verifica si el token ha expirado
      if (this.isTokenExpired(decoded)) {
        this.clearToken(); // Limpia el token si ha expirado
        return null;
      }
      return decoded?.sub ? parseInt(decoded.sub) : null;
    } catch (err) {
      console.error('Error al decodificar el token:', err);
      return null;
    }
  }

  // Verificar si el token ha expirado
  private isTokenExpired(decodedToken: any): boolean {
    const expirationTime = decodedToken?.exp;
    if (!expirationTime) {
      return false; // No se ha definido la expiración en el token
    }
    const currentTime = Math.floor(Date.now() / 1000); // Obtiene el tiempo actual en segundos
    return expirationTime < currentTime; // Retorna true si el token ha expirado
  }

  // Limpiar el token del localStorage
  private clearToken(): void {
    localStorage.removeItem('token');
  }

}
