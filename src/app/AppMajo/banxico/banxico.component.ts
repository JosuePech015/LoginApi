import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../Layout/navbar/navbar.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-banxico',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, NavbarComponent],
  templateUrl: './banxico.component.html',
  styleUrls: ['./banxico.component.css']
})
export class BanxicoComponent {
  API_KEY = 'ad1bbb4e7ef6f49c8e8bfe2e85c554e17e13ee4d748006601c211cf7d4a90835'; // ← ya incluida
  indicadores: any[] = [];
  error: string = '';

  // 🔢 Conversor de divisas
  cantidad: number = 0;
  monedaOrigen: string = 'MXN';
  monedaDestino: string = 'USD';
  resultado: number | null = null;
  tipoCambioFix: number = 0;

  constructor(private http: HttpClient) {}

  obtenerDatos() {
    const series = [
      { id: 'SF43718', nombre: 'Tipo de cambio FIX (USD/MXN)' },
      { id: 'SP68257', nombre: 'Valor UDIS' },
      { id: 'SF43936', nombre: 'CETES 28 días (%)' }
    ];

    this.indicadores = [];
    this.error = '';

    series.forEach((serie) => {
      const url = `http://localhost:3000/api/banxico/SF43718`;
      const headers = new HttpHeaders({ 'Bmx-Token': this.API_KEY });

      this.http.get(url, { headers }).subscribe({
        next: (respuesta: any) => {
          const dato = respuesta?.bmx?.series?.[0]?.datos?.[0];
          if (dato) {
            if (serie.id === 'SF43718') {
              this.tipoCambioFix = parseFloat(dato.dato); // Guardamos para el conversor
            }
            this.indicadores.push({
              nombre: serie.nombre,
              fecha: dato.fecha,
              valor: dato.dato
            });
          }
        },
        error: (err) => {
          console.error(err);
          this.error = 'Error al obtener los datos de Banxico.';
        }
      });
    });
  }

  convertir() {
    if (!this.tipoCambioFix || this.cantidad <= 0) {
      this.resultado = null;
      return;
    }

    if (this.monedaOrigen === this.monedaDestino) {
      this.resultado = this.cantidad;
    } else if (this.monedaOrigen === 'USD' && this.monedaDestino === 'MXN') {
      this.resultado = this.cantidad * this.tipoCambioFix;
    } else if (this.monedaOrigen === 'MXN' && this.monedaDestino === 'USD') {
      this.resultado = this.cantidad / this.tipoCambioFix;
    } else {
      this.resultado = null;
    }
  }
}
