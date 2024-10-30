import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CardComponent } from './components/card/card.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
<<<<<<< HEAD
import { LoginComponent } from "./pages/login/login.component";
import { LoginviveroComponent } from "./pages/loginvivero/loginvivero.component";
import { RegistroComponent } from "./pages/registro/registro.component";
import { HomeComponent } from "./pages/home/home.component";
=======
import { CarritoComponent } from './pages/carrito/carrito.component';
<<<<<<< HEAD
import { ComunidadComponent } from './pages/comunidad/comunidad.component';
=======
>>>>>>> 3a8625730c52e540030d1be171f64bf9fdcd7dee
>>>>>>> 7b1d538032a9da42e17d335a4a6c41ee4bfaf8dc

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    TiendaComponent,
<<<<<<< HEAD
    CarritoComponent,
    ComunidadComponent
=======
<<<<<<< HEAD
    LoginComponent,
    LoginviveroComponent,
    RegistroComponent,
    HomeComponent
],
=======
    CarritoComponent
>>>>>>> 7b1d538032a9da42e17d335a4a6c41ee4bfaf8dc
  ],
>>>>>>> 3a8625730c52e540030d1be171f64bf9fdcd7dee
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Jardin_Sabio';
}
