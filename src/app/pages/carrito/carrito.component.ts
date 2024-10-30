import { Component } from '@angular/core';
import { CardCarritoComponent } from '../../components/card-carrito/card-carrito.component';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CardCarritoComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent {

}
