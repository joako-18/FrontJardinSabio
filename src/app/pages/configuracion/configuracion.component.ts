import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service'; // Importa tu servicio
import { EditProfileDialogComponent } from '../../components/edit-profile-dialog/edit-profile-dialog.component';
import { TokenService } from '../../services/token.service'; // Importa tu servicio

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent implements OnInit {
  user: any = null; // Información del usuario
  isLoading: boolean = true; // Indica si está cargando

  constructor(private userService: UserService, private dialog: MatDialog, private tokenService: TokenService,) {}

  ngOnInit(): void {
    const userId = this.tokenService.getUserIdFromToken(); // Obtiene el userId del token
    if (userId) {
      this.fetchUserData(userId); // Carga los datos del usuario
    } else {
      console.error('Usuario no autenticado o token inválido.');
      this.isLoading = false; // Detiene el indicador de carga
    }
  }

  // Método para obtener los datos del usuario
  fetchUserData(userId: number): void {
    this.userService.getUserById(userId).subscribe(
      (data) => {
        this.user = data;
        this.isLoading = false; // Detiene el indicador de carga
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
      data: { ...this.user }, // Envía los datos actuales del usuario al diálogo
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Aquí puedes integrar tu método updateUser
        console.log('Datos guardados:', result);
      }
    });
  }
}


