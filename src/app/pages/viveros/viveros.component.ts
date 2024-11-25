import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NurseryService } from '../../services/nursery.service';
import { Observable } from 'rxjs';
import { CardViveroComponent } from '../../components/card-vivero/card-vivero.component';
import { CommonModule } from '@angular/common';
declare const google: any;

@Component({
  selector: 'app-viveros',
  standalone: true,
  imports: [CommonModule, CardViveroComponent],
  templateUrl: './viveros.component.html',
  styleUrls: ['./viveros.component.scss']
})
export class ViverosComponent implements OnInit, AfterViewInit {
  viveros: any[] = [];
  errorMessage: string = '';

  constructor(private viveroService: NurseryService) {}

  ngOnInit(): void {
    this.loadViveros(1); // Usa un ID de usuario de prueba
  }

  ngAfterViewInit(): void {
    this.initMap();
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

  initMap(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const mapElement = document.getElementById('map');
        if (!mapElement) {
          console.error('El elemento con ID "map" no fue encontrado.');
          return;
        }

        const map = new google.maps.Map(mapElement as HTMLElement, {
          zoom: 12,
          center: userCoords,
        });

        new google.maps.Marker({
          position: userCoords,
          map,
          title: 'Tu ubicación',
        });

        this.viveros.forEach((vivero) => {
          if (vivero.lat && vivero.lng) {
            new google.maps.Marker({
              position: { lat: vivero.lat, lng: vivero.lng },
              map,
              title: vivero.name,
            });
          } else {
            console.warn(`El vivero "${vivero.name}" no tiene coordenadas.`);
          }
        });
      },
      () => {
        console.error('Acceso a la geolocalización denegado. Centrando el mapa en ubicación predeterminada.');
        this.errorMessage = 'No se pudo obtener tu ubicación.';
        const defaultCoords = { lat: 19.432608, lng: -99.133209 }; // Ciudad de México
        const mapElement = document.getElementById('map');
        if (!mapElement) return;

        new google.maps.Map(mapElement as HTMLElement, {
          zoom: 12,
          center: defaultCoords,
        });
      }
    );
  }

}
