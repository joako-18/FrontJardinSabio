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
      ubication: ['', Validators.required],
      img: [null],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const formData = this.createFormData();

      if (!formData) {
        alert('Las contraseñas no coinciden.');
        return;
      }

      this.userService.signUp(formData).subscribe(
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
  }

  private createFormData(): FormData | null {
    const formData = new FormData();

    const values = this.registerForm.value;

    if (values.password !== values.confirmPassword) {
      return null; // Las contraseñas no coinciden
    }

    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('ubication', JSON.stringify({ location: values.ubication }));
    formData.append('role', values.userType);

    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }

    return formData;
  }
}
