import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadComponent: () => import('./feature/auth/login/page/login').then((m) => m.Login)
  },
  {
    path: 'registro',
    loadComponent: () => import('./feature/auth/registro/page/registro').then((m) => m.Registro)
  },
  {
    path: 'inicio',
    loadComponent: () => import('./feature/inicio/page/inicio').then((m) => m.Inicio)
  },
  {
    path: 'admin',
    loadComponent: () => import('./feature/admin/inicio/page/admin-inicio').then((m) => m.AdminInicio)
  }
];