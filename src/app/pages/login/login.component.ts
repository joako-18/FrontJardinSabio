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
        Validators.minLength(6),
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

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.userService.login(email, password).subscribe({
        next: (response: any) => {
          const { token, role } = response;

          // Almacena token y rol en localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);

          // Redirige a una ruta predeterminada, el guard hará el resto
          this.router.navigate(['/home']);
        },
        error: () => {
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
