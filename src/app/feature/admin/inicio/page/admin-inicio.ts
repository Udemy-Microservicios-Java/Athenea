import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { SesionService } from '../../../../core/services/sesion.service';

@Component({
  selector: 'app-admin-inicio',
  imports: [RouterLink, Card, Button],
  templateUrl: './admin-inicio.html'
})
export class AdminInicio {
  readonly sesion = inject(SesionService);
  private readonly router = inject(Router);

  salir(): void {
    this.sesion.cerrar();
    this.router.navigate(['/login']);
  }
}