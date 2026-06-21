# Mobile Shop — Inditex Front-End Test

Mini-SPA para comprar dispositivos móviles. Desarrollada con React + Vite.

## Stack

- **React 18** + **React Router v6** (SPA, client-side routing)
- **Vite** (bundler)
- **Vitest** + **Testing Library** (tests)
- **ESLint** (lint)
- JS ES6+ (sin TypeScript)

## Requisitos

- Node.js >= 18

## Instalación

```bash
npm install
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm start` | Modo desarrollo (http://localhost:5173) |
| `npm run build` | Compilación para producción |
| `npm test` | Lanzamiento de tests |
| `npm run lint` | Comprobación de código |

## Funcionalidades

### PLP (Product List Page) — `/`
- Grid responsivo de hasta 4 columnas
- Búsqueda en tiempo real por marca y modelo
- Navegación al detalle al hacer click en un producto

### PDP (Product Details Page) — `/product/:id`
- Layout dos columnas: imagen | descripción + acciones
- Ficha completa del producto (CPU, RAM, OS, batería, cámaras, dimensiones, peso)
- Selectores de color y almacenamiento
- Botón "Add to cart" conectado al API

### Header
- Logo con enlace a home
- Breadcrumbs de navegación
- Contador del carrito (persiste en `localStorage`)

## Caché API

Las respuestas de `GET /api/product` y `GET /api/product/:id` se cachean en `localStorage` con TTL de 1 hora. El contador del carrito también persiste entre sesiones.

## API

Base URL: `https://itx-frontend-test.onrender.com`

- `GET /api/product` — listado de productos
- `GET /api/product/:id` — detalle de producto
- `POST /api/cart` — añadir al carrito (`{ id, colorCode, storageCode }`)
