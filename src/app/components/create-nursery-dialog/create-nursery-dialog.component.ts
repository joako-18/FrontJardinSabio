import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NurseryService } from '../../services/nursery.service';
import { TokenService } from '../../services/token.service';

@Component({
  standalone: true,
  selector: 'app-create-nursery-dialog',
  imports: [
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './create-nursery-dialog.component.html',
  styleUrls: ['./create-nursery-dialog.component.scss'],
})
export class CreateNurseryDialogComponent {
  nurseryData: any = {
    name: '',
    description: '',
    ubication: '',
    img: null
  };

  constructor(
    public dialogRef: MatDialogRef<CreateNurseryDialogComponent>,
    private nurseryService: NurseryService,
    private tokenService: TokenService
  ) {}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.nurseryData.img = file;
    }
  }

  createNursery(): void {
    const userId = this.tokenService.getUserIdFromToken();
    if (!userId) {
      console.error('No se pudo obtener el ID del usuario.');
      return;
    }

    const name = this.nurseryData.name;
    const description = this.nurseryData.description;
    const ubication = this.nurseryData.ubication;
    const img = this.nurseryData.img;    

    this.nurseryService.createNursery(userId, name, description, ubication, img)
    .subscribe({
      next: (response) => {
        console.log('Vivero creado exitosamente:', response);
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error al crear el vivero:', error);
      }
      });
  }
}
