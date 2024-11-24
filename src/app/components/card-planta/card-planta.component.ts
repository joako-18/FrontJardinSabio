import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-planta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-planta.component.html',
  styleUrl: './card-planta.component.scss'
})
export class CardPlantaComponent {
  @Input() plant: any | null = null;
}
