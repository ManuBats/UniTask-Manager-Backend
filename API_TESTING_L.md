# API Testing — Integrante 2 (Cursos)

URL base: `http://localhost:3000/api`

---

## Cursos

| Método | Endpoint | Auth | Body / Params |
|--------|----------|------|---------------|
| `GET` | `/api/cursos` | Sí | — |
| `GET` | `/api/cursos/:id` | Sí | — |
| `POST` | `/api/cursos` | Sí | `{ nombre, profesor?, color?, horario?, descripcion? }` |
| `PATCH` | `/api/cursos/:id` | Sí | `{ nombre?, profesor?, color?, horario?, descripcion? }` |
| `DELETE` | `/api/cursos/:id` | Sí | — |

**GET /api/cursos — Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Matemáticas",
    "profesor": "Dr. García",
    "color": "#3B82F6",
    "horario": "Lunes y Miércoles 10:00",
    "descripcion": "Curso de cálculo",
    "pendientes": 5
  }
]
```

> El campo `pendientes` se calcula automáticamente. No lo envíes al crear/editar.

---

## Actividades del Curso (DetalleCurso)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/actividades?id_curso=X` | Actividades de un curso |
| `PATCH` | `/api/actividades/:id` | Marcar completada: `{ "completada": true }` |

---

## 📋 Colores disponibles

```
#7C3AED  #3B82F6  #10B981  #F59E0B  #EF4444  #EC4899
#8B5CF6  #06B6D4  #84CC16  #F97316  #E11D48  #A855F7
```

---

## ⚠️ Advertencias

1. **Token**: Todos los endpoints requieren `Authorization: Bearer <token>`. Si recibes `401`, redirige a LoginActivity.
2. **Campos opcionales**: `profesor`, `horario` y `descripcion` pueden ser `null` o strings vacíos. El frontend actualmente los soporta.
3. **Eliminación en cascada**: Borrar un curso elimina automáticamente todas sus actividades. No necesitas borrarlas una por una.
4. **IDs como Int**: La API devuelve `id` como número entero.
