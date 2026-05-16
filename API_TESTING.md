# UniTask-Manager API — Guía de pruebas con Postman

URL base: `http://localhost:3000/api`

---

## 1. Autenticación

### POST /api/auth/register

Registrar un nuevo usuario.

**Body (JSON):**
```json
{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "contrasena": "123456"
}
```

**Respuesta exitosa (201):**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "usuario": {
        "id": 1,
        "nombre": "Juan Pérez",
        "email": "juan@example.com"
    }
}
```

---

### POST /api/auth/login

Iniciar sesión.

**Body (JSON):**
```json
{
    "email": "juan@example.com",
    "contrasena": "123456"
}
```

**Respuesta exitosa (200):**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "usuario": {
        "id": 1,
        "nombre": "Juan Pérez",
        "email": "juan@example.com"
    }
}
```

> **Importante:** Copia el `token` de login o register. Todos los endpoints siguientes requieren el header:
> **`Authorization: Bearer <token>`**

---

## 2. Cursos (requieren token)

### GET /api/cursos

Listar todos los cursos.

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta:**
```json
[
    {
        "id": 1,
        "nombre": "Matemáticas",
        "profesor": "Dr. García",
        "color": "#3B82F6"
    }
]
```

---

### POST /api/cursos

Crear un curso.

**Headers:**
```
Authorization: Bearer <token>
```

**Body (JSON):**
```json
{
    "nombre": "Matemáticas",
    "profesor": "Dr. García",
    "color": "#3B82F6"
}
```

> `color` opcional — si no se envía usa `#7C3AED`. Los colores disponibles desde la app Android: `#7C3AED`, `#3B82F6`, `#10B981`, `#F59E0B`, `#EF4444`, `#EC4899`

---

### DELETE /api/cursos/:id

Eliminar un curso (borra en cascada sus actividades).

**Headers:**
```
Authorization: Bearer <token>
```

**Ejemplo:** `DELETE http://localhost:3000/api/cursos/1`

---

## 3. Actividades (requieren token)

### GET /api/actividades

Listar actividades. Acepta query params opcionales.

**Headers:**
```
Authorization: Bearer <token>
```

**Ejemplos:**

| URL | Descripción |
|-----|-------------|
| `GET /api/actividades` | Todas las actividades |
| `GET /api/actividades?completada=false` | Solo pendientes |
| `GET /api/actividades?completada=true` | Solo completadas |
| `GET /api/actividades?orderBy=prioridad DESC` | Ordenadas por prioridad |
| `GET /api/actividades?orderBy=fecha ASC&limit=5` | Top 5 próximas |
| `GET /api/actividades?orderBy=prioridad DESC&completada=false&limit=3` | Urgentes no completadas |

---

### GET /api/actividades/counts

Obtener conteo de completadas y pendientes.

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta:**
```json
{
    "completadas": 5,
    "pendientes": 12
}
```

---

### POST /api/actividades

Crear una actividad.

**Headers:**
```
Authorization: Bearer <token>
```

**Body (JSON):**
```json
{
    "id_curso": 1,
    "titulo": "Examen parcial de cálculo",
    "tipo": "Examen",
    "fecha": "2026-06-15",
    "hora": "10:00",
    "prioridad": 2,
    "descripcion": "Repasar derivadas e integrales"
}
```

**Campos:**

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `titulo` | string | **Sí** | Título de la actividad |
| `fecha` | string | **Sí** | Fecha en formato `YYYY-MM-DD` |
| `id_curso` | int | No | ID del curso asociado |
| `tipo` | string | No | `"Tarea"`, `"Examen"` o `"Exposición"` |
| `hora` | string | No | Hora en formato `HH:MM` |
| `prioridad` | int | No | `0` = Baja, `1` = Media, `2` = Alta (default: `0`) |
| `descripcion` | string | No | Descripción detallada |

---

### PATCH /api/actividades/:id

Actualizar campos parciales de una actividad.

**Headers:**
```
Authorization: Bearer <token>
```

**Body (JSON) — solo enviar los campos a modificar:**
```json
{
    "completada": true,
    "prioridad": 1
}
```

**Otros ejemplos:**

Marcar como completada:
```json
{
    "completada": true
}
```

Reprogramar:
```json
{
    "fecha": "2026-07-01",
    "hora": "14:30"
}
```

---

### DELETE /api/actividades/:id

Eliminar una actividad.

**Headers:**
```
Authorization: Bearer <token>
```

**Ejemplo:** `DELETE http://localhost:3000/api/actividades/1`

---

## 4. Health Check

### GET /api/health

Verificar que el servidor está corriendo (no requiere token).

**Respuesta:**
```json
{
    "status": "ok",
    "timestamp": "2026-05-16T10:00:00.000Z"
}
```

---

## Flujo típico de prueba en Postman

1. **Crear colección** "UniTask-Manager API"
2. **Variables de colección:**
   - `base_url`: `http://localhost:3000/api`
   - `token`: (dejarlo vacío, se llena al hacer login)
3. **Script en Login/Register** (Tests tab) para auto-guardar el token:
   ```js
   if (pm.response.code === 200 || pm.response.code === 201) {
       pm.collectionVariables.set('token', pm.response.json().token);
   }
   ```
4. **En los demás requests**, usar `{{token}}` en el header:
   ```
   Authorization: Bearer {{token}}
   ```
5. Para probar el primer **POST /api/actividades**, asegúrate de tener al menos un curso creado y usa su `id` en `id_curso`.
