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
import { JardinComponent } from './pages/jardin/jardin.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuard } from './services/auth.guard';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard] },
  { path: 'comunidad', component: ComunidadComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'viveros', component: ViverosComponent, canActivate: [AuthGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: 'tienda', component: TiendaComponent, canActivate: [AuthGuard] },
  { path: 'jardin', component: JardinComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: '/home' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
