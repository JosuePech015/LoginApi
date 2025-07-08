import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/user.interface';
import { environment } from '../../enviroments/enviroment';


const baseURL = environment.loginURL;

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private http = inject(HttpClient);

  login(request: LoginRequest): Observable<any> {
    return this.http.post(`${baseURL}/Auth/login`, request);
  }
  
}