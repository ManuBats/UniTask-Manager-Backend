# API Testing — Integrante 1 (Login, Register, Dashboard, Estadísticas)

URL base: `http://localhost:3000/api`

---

## Autenticación

| Método | Endpoint | Auth | Body |
|--------|----------|------|------|
| `POST` | `/api/auth/register` | No | `{ nombre, email, contrasena }` |
| `POST` | `/api/auth/login` | No | `{ email, contrasena }` |

**Respuesta de ambos:**
```json
{
  "token": "eyJhbG...",
  "usuario": { "id": 1, "nombre": "Juan Pérez", "email": "juan@example.com" }
}
```

> Guarda el `token` en SharedPreferences. Todos los endpoints siguientes lo necesitan en header: `Authorization: Bearer <token>`

---

## Dashboard

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/auth/me` | Obtener nombre del usuario (para el saludo) |
| `GET` | `/api/actividades?prioridad=2&completada=false` | Tareas urgentes (alta prioridad pendientes) |
| `GET` | `/api/actividades?prioridad=1&completada=false` | Tareas próximas (media prioridad pendientes) |
| `GET` | `/api/actividades/counts` | Conteo completadas / pendientes |
| `PATCH` | `/api/actividades/:id` | Marcar completada: `{ "completada": true }` |

---

## Estadísticas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/stats/dashboard` | Stats completas del dashboard |

**Respuesta:**
```json
{
  "progreso": 29,
  "completadas": 5,
  "pendientes": 12,
  "total": 17,
  "cursoTop": { "nombre": "Matemáticas", "pendientes": 6 },
  "cursos": [
    { "nombre": "Matemáticas", "totalActividades": 8, "completadas": 2 }
  ]
}
```

---

## ⚠️ Advertencias

1. **Token**: Después de login/register, guarda el token y envíalo en todas las requests como `Authorization: Bearer <token>`. Si recibes `401`, redirige a LoginActivity.
2. **Formato de fecha**: La API solo acepta `YYYY-MM-DD`. El frontend actualmente usa `"d MMMM yyyy"` (ej: `"15 de junio de 2026"`). **Debes convertir** antes de enviar.
3. **IDs como Int**: La API devuelve `id` como número entero, no como `long`. Asegúrate de parsear correctamente en Java.
4. **Prioridades**: `0` = Baja, `1` = Media, `2` = Alta.
