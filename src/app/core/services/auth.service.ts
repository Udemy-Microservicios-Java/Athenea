import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.dev';
import { LoginRequest, LoginResponse, RegistroFormulario, UsuarioResponse } from '../interfaces/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  login(datos: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/api/auth/login`, datos);
  }

  registrar(datos: RegistroFormulario): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(`${environment.apiUrl}/api/auth/registro`, {
      ...datos,
      fechaNacimiento: this.fecha(datos.fechaNacimiento)
    });
  }

  private fecha(valor: Date): string {
    const mes = String(valor.getMonth() + 1).padStart(2, '0');
    const dia = String(valor.getDate()).padStart(2, '0');
    return `${valor.getFullYear()}-${mes}-${dia}`;
  }
}