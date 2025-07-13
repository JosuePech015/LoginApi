import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../Layout/navbar/navbar.component';


@Component({
  selector: 'app-mailchimp',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './mailchimp.component.html',
  styleUrls: ['./mailchimp.component.css']
})
export class MailchimpComponent {
  form = {
    nombre: '',
    correo: '',
    mensaje: ''
  };
  mensaje = '';
  error = '';

  constructor(private http: HttpClient) {}

  enviarCorreo() {
    this.mensaje = '';
    this.error = '';
    this.http.post<any>('http://localhost:3001/api/send-mail', this.form)
      .subscribe({
        next: () => {
          this.mensaje = '¡Correo enviado correctamente!';
          this.form = { nombre: '', correo: '', mensaje: '' };
        },
        error: () => {
          this.error = 'Error al enviar el correo. Intenta de nuevo.';
        }
      });
  }
}
