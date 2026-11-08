export const ROLES = {
  admin: 'ROLE_ADMIN',
  bibliotecario: 'ROLE_BIBLIOTECARIO',
  lector: 'ROLE_LECTOR'
} as const;

export function rutaDeInicio(roles: string[]): string {
  if (roles.includes(ROLES.admin)) {
    return '/admin';
  }
  return '/inicio';
}