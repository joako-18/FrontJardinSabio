import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ComunidadComponent } from './pages/comunidad/comunidad.component';
import { LoginComponent } from './pages/login/login.component';
import { ViverosComponent } from './pages/viveros/viveros.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { JardinComponent } from './pages/jardin/jardin.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'carrito',
    component: CarritoComponent,
    canActivate: [AuthGuard]
  },
  { path: 'comunidad', component: ComunidadComponent },
  { path: 'login', component: LoginComponent },
  { path: 'viveros', component: ViverosComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'tienda', component: TiendaComponent },
  { path: 'jardin', component: JardinComponent},
  { path: '**', redirectTo: '/home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
