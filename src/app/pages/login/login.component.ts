import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {
    // Configuración del formulario con validaciones
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6), // Contraseña con un mínimo de 6 caracteres
      ]),
    });
  }

  // Getters para acceder a los controles desde el template
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Método para manejar el submit
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.userService.login(email, password).subscribe({
        next: (response: any) => {
          const { token, role } = response;

          // Almacena el token y el rol en localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);

          // Redirige según el rol del usuario
          if (role === 'usuario') {
            this.router.navigate(['/home']);
          } else if (role === 'gestor_vivero') {
            this.router.navigate(['/loginVivero']);
          }
        },
        error: () => {
          // Mensaje de error si las credenciales son inválidas
          this.errorMessage = 'Email o contraseña incorrectos. Inténtalo de nuevo.';
        },
      });
    }
  }

  // Navegación al registro
  onRegistro(): void {
    this.router.navigate(['/registro']);
  }
}
