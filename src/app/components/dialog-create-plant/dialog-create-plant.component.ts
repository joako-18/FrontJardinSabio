import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlantService } from '../../services/plant.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-dialog-create-plant',
  standalone: true,
  templateUrl: './dialog-create-plant.component.html',
  styleUrls: ['./dialog-create-plant.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class DialogCreatePlantComponent {
  plantData: any = {
    name: '',
    description: '',
    hora_de_riego: '',
    category: '',
    tipo: '',
    img: null
  };

  categories = ['Interior', 'Exterior', 'Ornamental'];
  types = ['Cactus', 'Suculenta', 'Arbusto', 'Otro'];

  constructor(
    public dialogRef: MatDialogRef<DialogCreatePlantComponent>,
    private plantService: PlantService,
    private tokenService: TokenService // Inyecta el TokenService
  ) {}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.plantData.img = file;
    }
  }

  createPlant(): void {
    const userId = this.tokenService.getUserIdFromToken(); // Obtén el ID del usuario desde el TokenService

    if (!userId) {
      console.error('No se pudo obtener el ID del usuario desde el token.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.plantData.name);
    formData.append('description', this.plantData.description);
    formData.append('hora_de_riego', this.plantData.hora_de_riego);
    formData.append('category', this.plantData.category);
    formData.append('tipo', this.plantData.tipo);
    if (this.plantData.img) {
      formData.append('img', this.plantData.img);
    }

    this.plantService.createPlant(userId, formData).subscribe(
      (response) => {
        console.log('Planta creada exitosamente:', response);
        this.dialogRef.close(true); // Cierra el diálogo y envía un resultado positivo
      },
      (error) => {
        console.error('Error al crear la planta:', error);
      }
    );
  }
}
