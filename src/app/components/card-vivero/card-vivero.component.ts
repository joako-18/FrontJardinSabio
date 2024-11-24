import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-vivero',
  standalone: true,
  imports: [],
  templateUrl: './card-vivero.component.html',
  styleUrl: './card-vivero.component.scss'
})
export class CardViveroComponent {
  @Input() vivero: any;
}
