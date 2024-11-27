import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-create-nursery-dialog',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './create-nursery-dialog.component.html',
  styleUrls: ['./create-nursery-dialog.component.scss'],
})
export class CreateNurseryDialogComponent {
  nurseryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateNurseryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.nurseryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      ubication: ['', Validators.required],
      file: [null], // Imagen opcional
    });
  }

  // Envía los datos del formulario al componente que abrió el diálogo
  submitForm(): void {
    if (this.nurseryForm.valid) {
      this.dialogRef.close(this.nurseryForm.value);
    }
  }

  // Cancela la operación y cierra el diálogo sin datos
  cancel(): void {
    this.dialogRef.close(null);
  }

  // Actualiza el control del archivo cuando se selecciona un archivo
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.nurseryForm.patchValue({ file: input.files[0] });
    }
  }
}
