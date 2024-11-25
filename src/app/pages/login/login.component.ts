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

  // Método para manejar el submit
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.userService.login(email, password).subscribe({
        next: (response: any) => {
          const { token, role } = response;

          // Almacena token y rol en localStorage con expiración
          this.setItemWithExpiration('token', token, 1); // 1 minuto
          this.setItemWithExpiration('role', role, 1);  // 1 minuto

          // Redirige según el rol del usuario
          if (role === 'usuario') {
            this.router.navigate(['/home']);
          } else if (role === 'gestor_vivero') {
            this.router.navigate(['/loginVivero']);
          }
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

  // Almacena datos en localStorage con expiración
  private setItemWithExpiration(key: string, value: string, minutes: number): void {
    const now = new Date();
    const expiration = now.getTime() + minutes * 60 * 1000; // Convertir minutos a milisegundos
    const item = {
      value: value,
      expiration: expiration,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  // Recupera datos de localStorage verificando la expiración
  private getItemWithExpiration(key: string): string | null {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const parsedItem = JSON.parse(item);
    const now = new Date();

    if (now.getTime() > parsedItem.expiration) {
      localStorage.removeItem(key); // Eliminar el ítem expirado
      return null;
    }

    return parsedItem.value;
  }
}
