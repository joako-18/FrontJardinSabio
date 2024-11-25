import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  registerForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      userType: ['', Validators.required],
      ubication: [''], // Opcional
    });
  }

  /**
   * Método que se ejecuta al registrar
   */
  onRegister() {
    if (this.registerForm.valid) {
      const values = this.registerForm.value;

      // Verificar contraseñas
      if (values.password !== values.confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }

      const name = values.name;
      const email = values.email;
      const password = values.password;
      const ubication = values.ubication
        ? JSON.stringify({ location: values.ubication })
        : null;
      const role = values.userType;
      const file = this.selectedFile;

      // Llamar al servicio para registro
      this.userService.signUp(name, email, password, ubication, role, file).subscribe(
        (response) => {
          alert('Usuario registrado con éxito.');
          this.router.navigate(['login']);
        },
        (error) => {
          alert('Error: ' + (error.error?.detail || 'No se pudo registrar.'));
        }
      );
    } else {
      alert('Por favor, completa el formulario correctamente.');
    }
  }

  /**
   * Método para manejar selección de archivo
   * @param event Evento del input de archivo
   */
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
}
