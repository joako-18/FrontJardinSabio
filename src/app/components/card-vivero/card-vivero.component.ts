import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Vivero {
  id_nursery: number;
  info: {
    name: string;
    description: string;
  };
  ubication: string;
  img: string;
  id_manager: number;
}

@Component({
  selector: 'app-card-vivero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-vivero.component.html',
  styleUrl: './card-vivero.component.scss'
})
export class CardViveroComponent {
  @Input() vivero!: Vivero;
}