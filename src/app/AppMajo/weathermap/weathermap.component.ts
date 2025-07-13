import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../Layout/navbar/navbar.component';

@Component({
  selector: 'app-weathermap',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NavbarComponent],
  templateUrl: './weathermap.component.html',
  styleUrls: ['./weathermap.component.css'],
})
export class WeathermapComponent {
  API_KEY = '5612b97b224e823c6e73ece4069cf618'; // ← pon tu clave aquí
  ciudad: string = '';
  pais: string = 'MX';
  clima: any = null;
  error: string = '';

  constructor(private http: HttpClient) {}

  obtenerClima() {
    this.error = '';
    this.clima = null;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      this.ciudad
    )},${this.pais}&units=metric&lang=es&appid=${this.API_KEY}`;

    this.http.get(url).subscribe({
      next: (data: any) => {
        this.clima = {
          ciudad: data.name,
          temperatura: data.main.temp,
          descripcion: data.weather[0].description,
          icono: data.weather[0].icon,
          humedad: data.main.humidity,
          viento: data.wind.speed,
          visibilidad: (data.visibility / 1000).toFixed(1),
        };
      },
      error: (err) => {
        this.error = 'No se pudo obtener el clima. Verifica el nombre de la ciudad.';
        console.error(err);
      },
    });
  }
}
