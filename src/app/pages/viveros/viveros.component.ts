import { Component, OnInit } from '@angular/core';
import { NurseryService } from '../../services/nursery.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateNurseryDialogComponent } from '../../components/create-nursery-dialog/create-nursery-dialog.component';
import { CommonModule } from '@angular/common';
import { CardViveroComponent } from '../../components/card-vivero/card-vivero.component';
import { TokenService } from '../../services/token.service';

interface Vivero {
  id_nursery: number;
  info: {
    name: string;
    description: string;
  };
  ubication: string;
  img: string;
  id_manager: number;
}

@Component({
  selector: 'app-viveros',
  standalone: true,
  imports: [CommonModule, CardViveroComponent],
  templateUrl: './viveros.component.html',
  styleUrls: ['./viveros.component.scss']
})
export class ViverosComponent implements OnInit {
  viveros: Vivero[] = [];
  errorMessage: string = '';

  constructor(private dialog: MatDialog, private nurseryService: NurseryService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.loadViveros();
  }

  openCreateNurseryDialog(): void {
    const userId = this.getUserIdFromToken();
    if (!userId) {
      this.errorMessage = 'Error de autenticación. Por favor, inicia sesión nuevamente.';
      return;
    }

    const dialogRef = this.dialog.open(CreateNurseryDialogComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadViveros();
      }
    });
  }

  loadViveros(): void {
    const userId = this.getUserIdFromToken();
    if (!userId) {
      console.error('No se pudo obtener el ID del usuario.');
      this.errorMessage = 'Error de autenticación. Por favor, inicia sesión nuevamente.';
      return;
    }

    this.nurseryService.getNurseries(userId).subscribe({
      next: (data) => {
        console.log('Datos recibidos del servidor:', data);
        if (data && data.length > 0) {
          this.viveros = data;
          console.log('Viveros procesados:', this.viveros);
          this.errorMessage = '';
        } else {
          this.viveros = [];
          this.errorMessage = 'No hay viveros disponibles en este momento.';
        }
      },
      error: (error) => {
        console.error('Error al cargar viveros:', error);
        this.viveros = [];
        this.errorMessage = 'No se pudo cargar la información de los viveros.';
      }
    });
  }

  private getUserIdFromToken(): number | null {
    const token = this.tokenService.getToken(); // Obtén el token del almacenamiento local
    if (!token) {
      return null;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del token JWT
      console.log("payload_id:", payload.id);
      return payload.sub; // Cambia esto según cómo esté estructurado el token
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
}
