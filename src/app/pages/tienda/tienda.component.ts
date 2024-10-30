import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.scss'
})
export class TiendaComponent {

}
