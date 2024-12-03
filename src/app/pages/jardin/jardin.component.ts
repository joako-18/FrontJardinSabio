import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CardPlantaComponent } from '../../components/card-planta/card-planta.component';
import { DialogCreatePlantComponent } from '../../components/dialog-create-plant/dialog-create-plant.component';
import { PlantService } from '../../services/plant.service';
import { TokenService } from '../../services/token.service';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';

interface Plant {
  id_plant: number;
  name: string;
  description: string;
  hora_de_riego: string;
  category: string;
  tipo: string;
  img?: any;
}

@Component({
  selector: 'app-jardin',
  standalone: true,
  imports: [CardPlantaComponent, CommonModule],
  templateUrl: './jardin.component.html',
  styleUrls: ['./jardin.component.scss'],
})
export class JardinComponent implements OnInit {
  plants: Plant[] = []; // Tipado correcto
  userId: number | null = null; // ID del usuario desde el token
  selectedPlant: Plant | null = null; // Planta seleccionada

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
    console.log("Seleccionando planta con ID:", plantId);
    if (this.userId) {
      this.plantService.getPlantById(this.userId, plantId).subscribe(
        (data) => {
          console.log("Datos de planta recibidos:", data);
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
    console.log("Ventana abierta")
    const dialogRef = this.dialog.open(DialogCreatePlantComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("result :", result)
      this.loadUserPlants();
    });
  }
}
