import { Component } from '@angular/core';
import { CardPlantaComponent } from '../../components/card-planta/card-planta.component';
import { PlantService } from '../../services/plant.service';
import { CommonModule } from '@angular/common';

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

  constructor(private plantService: PlantService) {}

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
}
