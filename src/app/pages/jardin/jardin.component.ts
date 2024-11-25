import { Component } from '@angular/core';
import { CardPlantaComponent } from '../../components/card-planta/card-planta.component';
import { PlantService } from '../../services/plant.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreatePlantComponent } from '../../components/dialog-create-plant/dialog-create-plant.component';

@Component({
  selector: 'app-jardin',
  standalone: true,
  imports: [CardPlantaComponent, CommonModule],
  templateUrl: './jardin.component.html',
  styleUrl: './jardin.component.scss'
})
export class JardinComponent {
  plants: any[] = []; // Array para almacenar las plantas del usuario
  userId: number = 1; // ID del usuario (cámbialo según tu lógica)
  selectedPlant: any | null = null;

  constructor(private plantService: PlantService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUserPlants();
  }

  loadUserPlants(): void {
    this.plantService.getPlantsByUser(this.userId).subscribe(
      (data) => {
        this.plants = data; // Asignar las plantas recibidas
      },
      (error) => {
        console.error('Error al obtener las plantas:', error);
      }
    );
  }

  selectPlant(plantId: number): void {
    this.plantService.getPlantById(this.userId, plantId).subscribe(
      (data) => {
        this.selectedPlant = data; // Asignar la planta seleccionada
      },
      (error) => {
        console.error('Error al obtener la planta:', error);
      }
    );
  }

openCreatePlantDialog(): void {
  const dialogRef = this.dialog.open(DialogCreatePlantComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      const formData = new FormData();
      formData.append('name', result.name);
      formData.append('description', result.description);
      formData.append('hora_de_riego', result.hora_de_riego);
      formData.append('category', result.category);
      formData.append('tipo', result.tipo);
      if (result.img) {
        formData.append('img', result.img);
      }

      this.plantService.createPlant(this.userId, formData).subscribe(
        (response) => {
          this.loadUserPlants(); // Recargar las plantas después de crear una nueva
        },
        (error) => {
          console.error('Error al crear la planta:', error);
        }
      );
    }
  });
}
}
