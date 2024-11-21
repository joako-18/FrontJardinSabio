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
      const formData = this.registerForm.value;
      if (formData.password !== formData.confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }

      const user = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        ubication: { location: formData.ubication }, // Modifica según tu formato
        role: formData.userType,
        img: formData.img,
      };

      this.userService.registerUser(user).subscribe(
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
    this.registerForm.patchValue({ img: file });
  }
}
