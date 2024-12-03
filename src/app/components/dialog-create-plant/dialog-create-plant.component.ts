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

  createPlant() {
    const userId = this.tokenService.getUserIdFromToken();

    if (!userId) {
        console.error('No se pudo obtener el ID del usuario desde el token.');
        return;
    }

    if (!this.plantData.name || !this.plantData.description || 
        !this.plantData.hora_de_riego || !this.plantData.category || 
        !this.plantData.tipo) {
        console.error('Todos los campos son requeridos');
        return;
    }

    const name = this.plantData.name.trim();
    const description = this.plantData.description.trim();
    const hora_de_riego = this.plantData.hora_de_riego.trim();
    const category = this.plantData.category;
    const tipo = this.plantData.tipo;
    const img = this.plantData.img;
    
    console.log('Datos a enviar:', {
        name,
        description,
        hora_de_riego,
        category,
        tipo,
        img
    });
  
    this.plantService.createPlant(userId, name, description, hora_de_riego, category, tipo, img)
        .subscribe({
            next: (response) => {
                console.log('Planta creada exitosamente:', response);
                this.dialogRef.close(true);
            },
            error: (error) => {
                console.error('Error detallado al crear la planta:', error);
                // Aquí puedes mostrar un mensaje de error al usuario
            }
        });
  }
}
