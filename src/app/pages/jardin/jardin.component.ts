import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CardPlantaComponent } from '../../components/card-planta/card-planta.component';
import { DialogCreatePlantComponent } from '../../components/dialog-create-plant/dialog-create-plant.component';
import { PlantService } from '../../services/plant.service';
import { TokenService } from '../../services/token.service'; // Servicio para obtener el token

@Component({
  selector: 'app-jardin',
  standalone: true,
  imports: [CardPlantaComponent, CommonModule],
  templateUrl: './jardin.component.html',
  styleUrls: ['./jardin.component.scss'],
})
export class JardinComponent implements OnInit {
  plants: any[] = []; // Plantas del usuario
  userId: number | null = null; // ID del usuario desde el token
  selectedPlant: any | null = null; // Planta seleccionada

  constructor(
    private plantService: PlantService,
    private dialog: MatDialog,
    private tokenService: TokenService // Inyección del servicio del token
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenService.getUserIdFromToken(); // Obtiene el ID del usuario
    if (this.userId) {
      this.loadUserPlants();
    } else {
      console.error('No se pudo obtener el ID del usuario.');
    }
  }

  // Carga las plantas del usuario
  loadUserPlants(): void {
    if (this.userId) {
      this.plantService.getPlantsByUser(this.userId).subscribe(
        (data) => {
          this.plants = data;
        },
        (error) => {
          console.error('Error al cargar las plantas:', error);
        }
      );
    }
  }

  // Selecciona una planta específica
  selectPlant(plantId: number): void {
    if (this.userId) {
      this.plantService.getPlantById(this.userId, plantId).subscribe(
        (data) => {
          this.selectedPlant = data;
        },
        (error) => {
          console.error('Error al cargar la planta:', error);
        }
      );
    }
  }

  // Abre el diálogo para crear una nueva planta
  openCreatePlantDialog(): void {
    const dialogRef = this.dialog.open(DialogCreatePlantComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.userId) {
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
          () => {
            this.loadUserPlants(); // Recargar plantas tras crear una nueva
          },
          (error) => {
            console.error('Error al crear la planta:', error);
          }
        );
      }
    });
  }
}
