import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { SesionService } from '../../../core/services/sesion.service';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, Card, Button],
  templateUrl: './inicio.html'
})
export class Inicio {
  readonly sesion = inject(SesionService);
  private readonly router = inject(Router);

  salir(): void {
    this.sesion.cerrar();
    this.router.navigate(['/login']);
  }
}