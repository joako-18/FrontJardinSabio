import { Component } from '@angular/core';
import { CardPlantaComponent } from '../../components/card-planta/card-planta.component';

@Component({
  selector: 'app-jardin',
  standalone: true,
  imports: [CardPlantaComponent],
  templateUrl: './jardin.component.html',
  styleUrl: './jardin.component.scss'
})
export class JardinComponent {

}
