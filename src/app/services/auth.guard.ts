import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
      return false;
    }

    const expectedRole = route.data['role'];
    if (expectedRole && !this.hasRole(expectedRole)) {
      this.router.navigate(['/unauthorized']); // Redirige si no tiene el rol esperado
      return false;
    }

    return true; // Permite el acceso si está autenticado y cumple con las condiciones
  }

  hasRole(role: string): boolean {
    const decodedToken = this.authService.getDecodedToken();
    return decodedToken?.role === role;
  }
}
