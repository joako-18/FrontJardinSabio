import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor( private router: Router){}

  onHome() {
    this.router.navigate(['home']);
  }

  onPlantas() {
    this.router.navigate(['plantas']);
  }

  onComunidad() {
    this.router.navigate(['comunidad']);
  }

  onViveros() {
    this.router.navigate(['viveros']);
  }

  onTienda() {
    this.router.navigate(['tienda']);
  }

  onCarrito() {
    this.router.navigate(['carrito']);
  }

  onLogin() {
    this.router.navigate(['login']);
  }
}
