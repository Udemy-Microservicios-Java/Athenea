import { HttpErrorResponse } from '@angular/common/http';

export function leerMensaje(error: HttpErrorResponse): string {
  const cuerpo = error.error;
  if (cuerpo && typeof cuerpo === 'object' && 'mensaje' in cuerpo && cuerpo.mensaje) {
    return String(cuerpo.mensaje);
  }
  return 'No hay respuesta del servidor. Revisa que el gateway, ms-usuarios y ms-excepciones estén encendidos.';
}