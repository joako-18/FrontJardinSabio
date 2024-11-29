import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-create-nursery-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './create-nursery-dialog.component.html',
  styleUrls: ['./create-nursery-dialog.component.scss'],
})
export class CreateNurseryDialogComponent {
  nurseryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService
  ) {
    this.nurseryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      ubication: ['', Validators.required],
      file: [null], // Imagen opcional
    });
  }

  // Obtiene el ID del usuario desde el token
  private getUserId(): number | null {
    return this.tokenService.getUserIdFromToken();
  }

  // Envía los datos del formulario junto con el ID del usuario
  submitForm(): void {
    if (this.nurseryForm.valid) {
      const userId = this.getUserId();
      if (!userId) {
        console.error('No se pudo obtener el ID del usuario.');
        return;
      }

      const formData = new FormData();
      formData.append('userId', String(userId));
      formData.append('name', this.nurseryForm.value.name);
      formData.append('description', this.nurseryForm.value.description);
      formData.append('ubication', this.nurseryForm.value.ubication);
      if (this.nurseryForm.value.file) {
        formData.append('file', this.nurseryForm.value.file);
      }

      // Aquí envías los datos al backend
      console.log('Datos a enviar:', formData);
      // Implementa la lógica para enviar al servicio correspondiente
    }
  }

  // Cancela la operación y cierra el diálogo
  cancel(): void {
    // Lógica para cerrar el diálogo
    console.log('Operación cancelada');
  }

  // Actualiza el control del archivo cuando se selecciona un archivo
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.nurseryForm.patchValue({ file: input.files[0] });
    }
  }
}
