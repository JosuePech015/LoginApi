import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from './services/loginService.service';
import { FirebaseAuthService } from './services/firebaseService.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from "../Layout/navbar/navbar.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, NavbarComponent],
  providers: [LoginServiceService, FirebaseAuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'my-project';
  username: string = '';
  password: string = '';
  error: string = '';
  success: string = '';
  token: string = '';

  constructor(
    private loginService: LoginServiceService,
    private firebaseAuth: FirebaseAuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.error = '';
    this.success = '';
    this.token = '';
    this.loginService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.token = response.token;
            this.success = '¡Inicio de sesión exitoso! Token obtenido abajo.';
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 5000);
          } else {
            this.error = 'Respuesta inesperada del servidor';
          }
        },
        error: (err) => {
          console.error('Error en login:', err);
          this.error = 'Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.';
        }
      });
  }

  async loginWithGoogle() {
    try {
      this.error = '';
      this.success = '';
      const user = await this.firebaseAuth.loginWithGoogle();
      this.success = `¡Bienvenido ${user.displayName}! Iniciando sesión con Google...`;
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    } catch (error) {
      this.error = 'Error al iniciar sesión con Google';
      console.error('Error:', error);
    }
  }

  copyToken() {
    if (this.token) {
      navigator.clipboard.writeText(this.token);
      alert('Token copiado al portapapeles');
    }
  }
}