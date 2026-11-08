# Athenea

Portal web del proyecto. Está hecho con Angular 21 y consume los microservicios de usuarios y excepciones.

## Stack

| Tecnología | Versión | Propósito |
| --- | --- | --- |
| Angular | ^21.2 | Framework standalone, sin Zone.js |
| PrimeNG | ^21.1 | Componentes de interfaz |
| @primeuix/themes | ^3.1 | Presets de tema. La base es Aura |
| PrimeFlex | ^4.0 | Utilidades CSS |
| PrimeIcons | ^7.0 | Iconos (`pi pi-*`) |
| Vitest | ^4.0 | Pruebas unitarias (`ng test`) |

Esas dependencias ya están en `package.json`. El tema Aura se registra en `src/app/app.config.ts`. Los iconos y PrimeFlex entran por `src/styles.scss`.

## Cómo levantarlo

Dentro de esta carpeta:

```bash
ng serve
```

La aplicación queda en `http://localhost:4200/`. Al guardar un archivo, el navegador se actualiza solo.

Para compilar:

```bash
ng build
```

El resultado queda en `dist/`.

Para ordenar el código con las reglas de Prettier definidas en `package.json`:

```bash
npx prettier --write .
```

## Carpetas

### Raíz del proyecto

| Carpeta o archivo | Para qué sirve |
| --- | --- |
| `src/` | Código de la aplicación: pantallas, estilos y el arranque. |
| `public/` | Archivos que se copian tal cual al construir, por ejemplo imágenes fijas. |
| `angular.json` | Configuración del CLI: cómo se construye, qué estilos entran y en qué puerto sirve. |
| `package.json` | Dependencias, scripts (`start`, `build`, `test`) y las reglas de Prettier. |
| `tsconfig.json` | Reglas de TypeScript para todo el proyecto. |
| `tsconfig.app.json` | Reglas de TypeScript solo para la aplicación. |
| `tsconfig.spec.json` | Reglas de TypeScript solo para las pruebas. |
| `.editorconfig` | Convención de espacios y saltos de línea para el editor. |
| `.gitignore` | Archivos que Git no debe versionar, como `node_modules/` y `dist/`. |

`node_modules/` y `.angular/` las crean las herramientas al instalar y al compilar. No se editan a mano.

### `src/`

| Carpeta o archivo | Para qué sirve |
| --- | --- |
| `main.ts` | Punto de entrada. Arranca Angular con la configuración de `app.config.ts`. |
| `index.html` | Página única del navegador. Angular pinta la aplicación dentro de ella. |
| `styles.scss` | Estilos globales. Importa los iconos de PrimeIcons y las clases de PrimeFlex. |
| `environment/` | Datos que cambian según el entorno. `environment.dev.ts` guarda la versión de la aplicación y la URL base de las APIs en desarrollo. |

### `src/app/`

Archivos de la aplicación en sí.

| Archivo | Para qué sirve |
| --- | --- |
| `app.ts` | Componente raíz. Es el contenedor de lo que se ve en el navegador. |
| `app.html` | Plantilla de ese componente. |
| `app.scss` | Estilos propios de ese componente. |
| `app.config.ts` | Proveedores globales: rutas y el tema Aura de PrimeNG. |
| `app.routes.ts` | Tabla de rutas. Hoy está vacía; cada pantalla nueva se registra aquí. |
| `app.spec.ts` | Prueba del componente raíz. |

### `src/app/core/`

Lo que existe una sola vez para toda la aplicación.

| Carpeta | Para qué sirve |
| --- | --- |
| `guards/` | Reglas que deciden si una ruta se puede abrir, por ejemplo exigir un token. |
| `interceptors/` | Código que acompaña cada llamada HTTP, por ejemplo agregar `Authorization: Bearer`. |
| `interfaces/` | Contratos de datos compartidos por toda la aplicación. |
| `services/` | Servicios únicos, como el cliente hacia `ms-usuarios` o el manejo del token. |
| `utils/` | Funciones de uso general que no pertenecen a una pantalla. |
| `theme/styles/` | Piezas del tema. `_breakpoints.scss` define los anchos de pantalla y `_mixins.scss` define bloques de estilo reutilizables. |

### `src/app/shared/`

Lo que varias pantallas pueden reutilizar.

| Carpeta | Para qué sirve |
| --- | --- |
| `components/` | Piezas visuales comunes, como una tabla o un mensaje de error. |
| `constants/` | Valores fijos que se repiten, como nombres de roles o textos. |
| `models/` | Formas de los datos que viajan entre pantallas, por ejemplo el usuario que muestra la interfaz. |
| `utils/` | Funciones pequeñas usadas por más de una pantalla. |

### `src/app/feature/`

Cada parte del negocio vive en su propia carpeta. `home/` es la primera pantalla. Las siguientes, como el login o la administración de usuarios, se agregan aquí como carpetas hermanas y se conectan en `app.routes.ts`.
