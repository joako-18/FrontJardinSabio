import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CardComponent } from './components/card/card.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { LoginComponent } from "./pages/login/login.component";
import { RegistroComponent } from "./pages/registro/registro.component";
import { HomeComponent } from "./pages/home/home.component";
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ComunidadComponent } from './pages/comunidad/comunidad.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    TiendaComponent,
    CarritoComponent,
    ComunidadComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    CarritoComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Jardin_Sabio';
}
