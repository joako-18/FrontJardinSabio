import { Component } from '@angular/core';
import { CardViveroComponent } from '../../components/card-vivero/card-vivero.component';
@Component({
  selector: 'app-viveros',
  standalone: true,
  imports: [CardViveroComponent],
  templateUrl: './viveros.component.html',
  styleUrl: './viveros.component.scss'
})
export class ViverosComponent {

}
