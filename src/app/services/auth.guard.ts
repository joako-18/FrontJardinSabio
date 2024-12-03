import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      if (!token || !role) {
        this.router.navigate(['/login']);
        return false;
      }

      if (role === 'usuario' || role === 'gestor_vivero') {
        return true;
      } else if (role === 'administrador' && route.routeConfig?.path === 'admin') {
        return true;
      } else if (role === 'administrador') {
        this.router.navigate(['/admin']);
        return false;
      }
    }
    return false;
  }
}
