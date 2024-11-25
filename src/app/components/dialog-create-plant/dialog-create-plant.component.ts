import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-create-plant',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './dialog-create-plant.component.html',
  styleUrls: ['./dialog-create-plant.component.scss']
})
export class DialogCreatePlantComponent {
  plantData: any = {
    name: '',
    description: '',
    hora_de_riego: '',
    category: '',
    tipo: '',
    img: null
  };
  categories = ['Interior', 'Exterior', 'Ornamental'];
  types = ['Cactus', 'Suculenta', 'Arbusto', 'Otro'];

  constructor(public dialogRef: MatDialogRef<DialogCreatePlantComponent>) {}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.plantData.img = file;
    }
  }

  createPlant(): void {
    this.dialogRef.close(this.plantData);
  }
}

