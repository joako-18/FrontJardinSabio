import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || !role) {
      // Si no hay token o rol, redirige al login
      this.router.navigate(['/login']);
      return false;
    }

    // Redirige según el rol
    if (role === 'usuario') {
      return true; // Permite el acceso a cualquier vista
    } else if (role === 'gestor_vivero') {
      this.router.navigate(['/viveros']); // Redirige a la vista de viveros
      return false;
    } else if (role === 'administrador') {
      this.router.navigate(['/admin']); // Solo permite acceso a la vista de admin
      return false;
    }

    // Rol desconocido, redirige al login
    this.router.navigate(['/login']);
    return false;
  }
}
