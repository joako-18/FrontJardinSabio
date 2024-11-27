import { Component, OnInit } from '@angular/core';
import { NurseryService } from '../../services/nursery.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreatePlantComponent } from '../../components/dialog-create-plant/dialog-create-plant.component';
import { CommonModule } from '@angular/common';
import { CardViveroComponent } from '../../components/card-vivero/card-vivero.component';

@Component({
  selector: 'app-viveros',
  standalone: true,
  imports: [CommonModule, CardViveroComponent],
  templateUrl: './viveros.component.html',
  styleUrls: ['./viveros.component.scss']
})
export class ViverosComponent implements OnInit {
  viveros: any[] = [];
  errorMessage: string = '';

  constructor(private dialog: MatDialog, private nurseryService: NurseryService) {}

  ngOnInit(): void {
    this.loadViveros();
  }

  openCreateNurseryDialog(): void {
    const userId = this.getUserIdFromToken();
    if (!userId) {
      this.errorMessage = 'Error de autenticación. Por favor, inicia sesión nuevamente.';
      return;
    }

    const dialogRef = this.dialog.open(DialogCreatePlantComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const formData = new FormData();
        formData.append('name', result.name);
        formData.append('description', result.description);
        formData.append('ubication', result.ubication);
        if (result.file) {
          formData.append('file', result.file);
        }

        this.nurseryService.createNursery(userId, formData).subscribe(
          (response) => {
            console.log('Vivero creado exitosamente:', response);
            this.loadViveros(); // Recargar viveros
          },
          (error) => {
            console.error('Error al crear vivero:', error);
            this.errorMessage = 'No se pudo crear el vivero. Intenta más tarde.';
          }
        );
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

    this.nurseryService.getNurseries(userId).subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.viveros = data;
          this.errorMessage = '';
        } else {
          this.viveros = [];
          this.errorMessage = 'No hay viveros disponibles en este momento.';
        }
      },
      (error) => {
        console.error('Error al cargar viveros:', error);
        this.viveros = [];
        this.errorMessage = 'No se pudo cargar la información de los viveros. Intenta más tarde.';
      }
    );
  }

  private getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del token JWT
      return payload.id; // Cambia esto según cómo esté estructurado el token
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
}
