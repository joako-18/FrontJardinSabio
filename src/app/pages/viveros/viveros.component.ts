import { Component, OnInit } from '@angular/core';
import { NurseryService } from '../../services/nursery.service';
import { Observable } from 'rxjs';
import { CardViveroComponent } from '../../components/card-vivero/card-vivero.component';
import { CommonModule } from '@angular/common';

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

  constructor(private viveroService: NurseryService) {}

  ngOnInit(): void {
    this.loadViveros(1); // Usa un ID de usuario de prueba
  }

  loadViveros(userId: number): void {
    this.viveroService.getNurseries(userId).subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.viveros = data;
          this.errorMessage = ''; // Limpiar el mensaje de error si hay datos
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
}
