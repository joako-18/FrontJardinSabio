import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeFormatPipe } from '../../pipes/time-format.pipe';

@Component({
  selector: 'app-card-planta',
  standalone: true,
  imports: [CommonModule, TimeFormatPipe],
  templateUrl: './card-planta.component.html',
  styleUrl: './card-planta.component.scss'
})
export class CardPlantaComponent {
  @Input() plant: any | null = null;
}
