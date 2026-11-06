# Tasks App con Mini React

Aplicación de lista de tareas, con el frontend hecho con:

visitar repo:
[Mini React](https://github.com/FiorellaMercado/mini-react-js)

Un framework de JS propio (JSX, virtual DOM y arquitectura Flux).

## Estructura

- `frontend/`: interfaz con Mini React y Vite (componentes, store, acciones y llamadas a la API).
- `backend/`: API REST con Express y SQLite y better-sqlite3.

## Requisitos

Node instalado.

## Cómo correrlo

Primero el backend (puerto 3000):

```
cd backend
npm install
npm start
```

Luego el frontend, en otra terminal:

```
cd frontend
npm install
npm run dev
```

Abre la URL que muestre Vite en la terminal. La base de datos `tareas.db` se crea sola la primera vez.

## API

Base: `http://localhost:3000/api/tareas`

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Lista todas las tareas |
| GET | `/:id` | Devuelve una tarea |
| POST | `/` | Crea una tarea. Body: { "titulo": "..." } |
| PATCH | `/:id` | Actualiza titulo y/o completado |
| DELETE | `/:id` | Elimina una tarea |

Cada tarea tiene: `id`, `titulo`, `completado` (booleano) y `created_at`.

## Documentación del framework

- Ver en la carpeta docs de la repo: [Mini React](https://github.com/FiorellaMercado/mini-react-js)
