import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Message } from 'primeng/message';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { AuthService } from '../../../../core/services/auth.service';
import { SesionService } from '../../../../core/services/sesion.service';
import { leerMensaje } from '../../../../core/utils/http-error';
import { rutaDeInicio } from '../../../../shared/constants/roles';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, Card, InputText, Password, Button, Message],
  templateUrl: './login.html'
})
export class Login {
  private readonly formularioBase = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly sesion = inject(SesionService);
  private readonly router = inject(Router);

  readonly cargando = signal(false);
  readonly mensaje = signal('');
  readonly aviso = signal(history.state?.registrado ? 'Cuenta creada. Ya puedes entrar.' : '');

  readonly formulario = this.formularioBase.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', Validators.required]
  });

  entrar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    this.mensaje.set('');
    this.authService.login(this.formulario.getRawValue()).subscribe({
      next: (respuesta) => {
        this.sesion.guardar(respuesta);
        this.router.navigate([rutaDeInicio(respuesta.roles)]);
      },
      error: (error: HttpErrorResponse) => {
        this.mensaje.set(leerMensaje(error));
        this.cargando.set(false);
      }
    });
  }
}