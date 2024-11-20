import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CardComponent,MatFormFieldModule,MatIconModule,MatInputModule],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.scss'
})
export class TiendaComponent {

}
