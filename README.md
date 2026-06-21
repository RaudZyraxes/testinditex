# Mobile Shop — Inditex Front-End Test

Mini-SPA para comprar dispositivos móviles. Desarrollada con React + Vite.

## Stack

- **React 18** + **React Router v6** (SPA, client-side routing)
- **Vite** (bundler / dev server)
- **Vitest** + **Testing Library** (tests)
- **ESLint 9** flat config (lint)
- JS ES6+ — sin TypeScript

## Requisitos

- Node.js >= 18

## Instalación

```bash
npm install
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm start` | Modo desarrollo — http://localhost:5173 |
| `npm run build` | Compilación para producción |
| `npm test` | Lanzamiento de tests |
| `npm run lint` | Comprobación de código |

## Vistas

### PLP — Product List Page (`/`)
- Grid responsivo: 4 columnas → 3 → 2 → 1 según resolución
- Búsqueda en tiempo real por marca y modelo
- Cada producto muestra imagen, marca, modelo y precio
- Click en producto navega al detalle

### PDP — Product Details Page (`/product/:id`)
- Dos columnas: imagen (sticky) | descripción + acciones
- Ficha completa: marca, modelo, precio, CPU, RAM, OS, resolución de pantalla, batería, cámaras, dimensiones, peso
- Selectores de almacenamiento y color (con valor por defecto; se muestran aunque solo haya una opción)
- Botón "Add to cart" — llama a `POST /api/cart` con `{ id, colorCode, storageCode }`
- Link para volver al listado

## Componentes principales

### Header
- Logo actúa como enlace a la vista principal
- Breadcrumbs con navegación contextual
- Contador de items del carrito en la parte derecha, visible en todas las vistas

### Cart
- Cajón lateral con los productos añadidos, cantidad y precio total
- Posibilidad de eliminar items individualmente
- Estado persistido en `localStorage` entre sesiones

## Caché API

Las respuestas de `GET /api/product` y `GET /api/product/:id` se almacenan en `localStorage` con TTL de 1 hora. Pasada la hora, la siguiente petición revalida los datos desde el servidor.

El contador del carrito se persiste también en `localStorage` para mantener el estado entre visitas.

## API

Base URL: `https://itx-frontend-test.onrender.com`

| Método | Path | Descripción |
|--------|------|-------------|
| GET | `/api/product` | Listado de productos |
| GET | `/api/product/:id` | Detalle de producto |
| POST | `/api/cart` | Añadir al carrito — body: `{ id, colorCode, storageCode }` |
