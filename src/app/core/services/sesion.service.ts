import { Injectable, signal } from '@angular/core';
import { LoginResponse } from '../interfaces/auth';

const CLAVE = 'athenea-sesion';

@Injectable({ providedIn: 'root' })
export class SesionService {
  private readonly actual = signal<LoginResponse | null>(this.leer());

  usuario(): LoginResponse | null {
    return this.actual();
  }

  token(): string | null {
    return this.actual()?.token ?? null;
  }

  guardar(sesion: LoginResponse): void {
    sessionStorage.setItem(CLAVE, JSON.stringify(sesion));
    this.actual.set(sesion);
  }

  cerrar(): void {
    sessionStorage.removeItem(CLAVE);
    this.actual.set(null);
  }

  private leer(): LoginResponse | null {
    const texto = sessionStorage.getItem(CLAVE);
    if (!texto) {
      return null;
    }
    return JSON.parse(texto) as LoginResponse;
  }
}