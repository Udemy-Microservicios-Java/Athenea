import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Message } from 'primeng/message';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { DatePicker } from 'primeng/datepicker';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { RegistroFormulario } from '../../../../core/interfaces/auth';
import { AuthService } from '../../../../core/services/auth.service';
import { leerMensaje } from '../../../../core/utils/http-error';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink, Card, InputText, Password, Button, Message, DatePicker],
  templateUrl: './registro.html'
})
export class Registro {
  private readonly formularioBase = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly cargando = signal(false);
  readonly mensaje = signal('');

  readonly formulario = this.formularioBase.group({
    nombreUsuario: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', Validators.required],
    nombreCompleto: ['', Validators.required],
    fechaNacimiento: [null as Date | null, Validators.required],
    politicaId: [null as number | null, [Validators.required, Validators.min(1)]]
  });

  crearCuenta(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const valor = this.formulario.getRawValue();
    const datos: RegistroFormulario = {
      nombreUsuario: valor.nombreUsuario ?? '',
      correo: valor.correo ?? '',
      contrasena: valor.contrasena ?? '',
      nombreCompleto: valor.nombreCompleto ?? '',
      fechaNacimiento: valor.fechaNacimiento ?? new Date(),
      politicaId: Number(valor.politicaId)
    };

    this.cargando.set(true);
    this.mensaje.set('');
    this.authService.registrar(datos).subscribe({
      next: () => this.router.navigate(['/login'], { state: { registrado: true } }),
      error: (error: HttpErrorResponse) => {
        this.mensaje.set(leerMensaje(error));
        this.cargando.set(false);
      }
    });
  }
}