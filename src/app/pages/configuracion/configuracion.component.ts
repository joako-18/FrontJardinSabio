import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { EditProfileDialogComponent } from '../../components/edit-profile-dialog/edit-profile-dialog.component';
import { TokenService } from '../../services/token.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent implements OnInit {
  user: any = null; // Datos del usuario
  isLoading: boolean = true; // Indicador de carga

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const userId = this.tokenService.getUserIdFromToken();
    console.log('UserId obtenido del token:', userId); // Log para depuración

    if (userId) {
      this.fetchUserData(userId); // Carga los datos del usuario
    } else {
      console.error('Usuario no autenticado o token inválido.');
      this.isLoading = false;
    }
  }

  fetchUserData(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      (data) => {
        console.log('Datos del usuario cargados:', data); // Log para depuración
        this.user = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar los datos del usuario:', error);
        this.isLoading = false;
      }
    );
  }

  openEditDialog() {
    if (!this.user) return;

    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '400px',
      data: { ...this.user }, // Enviar los datos del usuario al diálogo
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Datos actualizados:', result); // Log para depuración
        // Implementa la lógica para guardar los datos aquí
      }
    });
  }

  logout(): void {
    this.tokenService.clearToken(); // Borra el token
    window.location.href = '/login'; // Cambia según tu lógica de navegación
  }

}
