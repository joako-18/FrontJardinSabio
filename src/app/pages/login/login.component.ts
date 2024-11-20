import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    // Inicializamos el formulario reactivo
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response: any) => {
          const token = response.token;
          const role = response.role;

          // Guarda el token y el rol en el almacenamiento local
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);

          // Redirige según el rol
          if (role === 'usuario') {
            this.router.navigate(['/home']);
          } else if (role === 'gestor_vivero') {
            this.router.navigate(['/loginVivero']);
          }
        },
        error: (err) => {
          this.errorMessage = 'Credenciales inválidas. Inténtalo de nuevo.';
        }
      });
    }
  }

  onRegistro(): void {
    this.router.navigate(['/registro']);
  }
}

