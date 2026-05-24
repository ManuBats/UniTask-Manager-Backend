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

### GET /api/auth/me

Obtener perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta:**
```json
{
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com"
}
```

---

### PUT /api/auth/me

Actualizar perfil del usuario (nombre, email).

**Headers:**
```
Authorization: Bearer <token>
```

**Body (JSON) — solo enviar los campos a modificar:**
```json
{
    "nombre": "Juan Carlos Pérez",
    "email": "juancarlos@example.com"
}
```

**Respuesta:**
```json
{
    "id": 1,
    "nombre": "Juan Carlos Pérez",
    "email": "juancarlos@example.com"
}
```

---

### PUT /api/auth/password

Cambiar la contraseña del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Body (JSON):**
```json
{
    "contrasenaActual": "123456",
    "contrasenaNueva": "nuevaClave2026"
}
```

**Respuesta:**
```json
{
    "mensaje": "Contraseña actualizada correctamente"
}
```

---

### POST /api/auth/logout

Cerrar sesión (el cliente debe descartar el token).

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta:**
```json
{
    "mensaje": "Sesión cerrada correctamente"
}
```

---

## 2. Cursos (requieren token)

### GET /api/cursos

Listar todos los cursos del usuario autenticado.

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
        "color": "#3B82F6",
        "horario": "Lunes y Miércoles 10:00-12:00",
        "descripcion": "Curso de cálculo diferencial",
        "pendientes": 5
    }
]
```

> Cada curso ahora incluye `pendientes` (conteo de actividades no completadas), `horario` y `descripcion`.

---

### GET /api/cursos/:id

Obtener un curso por su ID (incluye sus actividades).

**Headers:**
```
Authorization: Bearer <token>
```

**Ejemplo:** `GET http://localhost:3000/api/cursos/1`

**Respuesta:**
```json
{
    "id": 1,
    "nombre": "Matemáticas",
    "profesor": "Dr. García",
    "color": "#3B82F6",
    "horario": "Lunes y Miércoles 10:00-12:00",
    "descripcion": "Curso de cálculo diferencial",
    "actividads": [
        {
            "id": 1,
            "id_curso": 1,
            "titulo": "Examen parcial de cálculo",
            "tipo": "Examen",
            "fecha": "2026-06-15",
            "hora": "10:00",
            "prioridad": 2,
            "descripcion": "Repasar derivadas e integrales",
            "completada": 0
        }
    ]
}
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
    "color": "#3B82F6",
    "horario": "Lunes y Miércoles 10:00-12:00",
    "descripcion": "Curso de cálculo diferencial"
}
```

**Campos:**

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `nombre` | string | **Sí** | Nombre del curso |
| `profesor` | string | No | Nombre del docente |
| `color` | string | No | Color hexadecimal (default: `#7C3AED`) |
| `horario` | string | No | Horario del curso |
| `descripcion` | string | No | Descripción del curso |

> Colores disponibles desde la app Android: `#7C3AED`, `#3B82F6`, `#10B981`, `#F59E0B`, `#EF4444`, `#EC4899`, `#8B5CF6`, `#06B6D4`, `#84CC16`, `#F97316`, `#E11D48`, `#A855F7`

---

### PATCH /api/cursos/:id

Actualizar campos parciales de un curso.

**Headers:**
```
Authorization: Bearer <token>
```

**Body (JSON) — solo enviar los campos a modificar:**
```json
{
    "nombre": "Matemáticas Avanzadas",
    "profesor": "Dr. García López",
    "color": "#EF4444",
    "horario": "Martes y Jueves 14:00-16:00",
    "descripcion": "Curso actualizado de cálculo integral"
}
```

**Ejemplo:** `PATCH http://localhost:3000/api/cursos/1`

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

Listar actividades del usuario. Acepta múltiples query params para filtrar.

**Headers:**
```
Authorization: Bearer <token>
```

**Ejemplos:**

| URL | Descripción |
|-----|-------------|
| `GET /api/actividades` | Todas las actividades del usuario |
| `GET /api/actividades?completada=false` | Solo pendientes |
| `GET /api/actividades?completada=true` | Solo completadas |
| `GET /api/actividades?orderBy=prioridad DESC` | Ordenadas por prioridad |
| `GET /api/actividades?orderBy=fecha ASC&limit=5` | Top 5 próximas |
| `GET /api/actividades?orderBy=prioridad DESC&completada=false&limit=3` | Urgentes no completadas |
| `GET /api/actividades?id_curso=1` | Actividades de un curso específico |
| `GET /api/actividades?prioridad=2&completada=false` | Actividades de prioridad alta pendientes |
| `GET /api/actividades?prioridad=1&completada=false` | Actividades de prioridad media pendientes |
| `GET /api/actividades?prioridad=0` | Actividades de prioridad baja |
| `GET /api/actividades?fecha=2026-06-15` | Actividades de una fecha específica |
| `GET /api/actividades?fechaInicio=2026-06-01&fechaFin=2026-06-30` | Actividades en rango de fechas |

**Query params:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `completada` | boolean | `true` = completadas, `false` = pendientes |
| `id_curso` | int | Filtrar por ID de curso |
| `prioridad` | int | Filtrar por nivel: `0` = Baja, `1` = Media, `2` = Alta |
| `fecha` | string | Filtrar por fecha exacta (`YYYY-MM-DD`) |
| `fechaInicio` | string | Fecha inicial para rango (`YYYY-MM-DD`) |
| `fechaFin` | string | Fecha final para rango (`YYYY-MM-DD`) |
| `orderBy` | string | Campo y dirección, ej: `fecha ASC`, `prioridad DESC` |
| `limit` | int | Máximo de resultados a devolver |

---

### GET /api/actividades/counts

Obtener conteo de completadas y pendientes del usuario.

**Headers:**
```
Authorization: Bearer <token>
```

**Query params opcionales:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `id_curso` | int | Filtrar conteo por curso |

**Ejemplo:** `GET /api/actividades/counts?id_curso=1`

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

> **⚠️ Importante sobre la fecha**: El frontend actualmente usa formato `"d MMMM yyyy"` (ej: `"15 de junio de 2026"`) en SQLite local. Al conectar con la API, **debes convertir la fecha a `YYYY-MM-DD`** (ej: `"2026-06-15"`) antes de enviarla. La API solo acepta y devuelve fechas en formato `YYYY-MM-DD`.

**Campos:**

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `titulo` | string | **Sí** | Título de la actividad |
| `fecha` | string | **Sí** | Fecha en formato `YYYY-MM-DD` |
| `id_curso` | int | No | ID del curso asociado (usar `-1` o `null` para actividad sin curso) |
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

Desvincular de un curso:
```json
{
    "id_curso": -1
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

## 4. Estadísticas (requieren token)

### GET /api/stats/dashboard

Obtener estadísticas agregadas del dashboard del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta:**
```json
{
    "progreso": 29,
    "completadas": 5,
    "pendientes": 12,
    "total": 17,
    "cursoTop": {
        "id": 1,
        "nombre": "Matemáticas",
        "color": "#3B82F6",
        "totalActividades": 8,
        "completadas": 2,
        "pendientes": 6
    },
    "cursos": [
        {
            "id": 1,
            "nombre": "Matemáticas",
            "color": "#3B82F6",
            "totalActividades": 8,
            "completadas": 2
        },
        {
            "id": 2,
            "nombre": "Comunicación",
            "color": "#10B981",
            "totalActividades": 5,
            "completadas": 3
        }
    ]
}
```

**Campos de la respuesta:**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `progreso` | int | Porcentaje de actividades completadas (0–100) |
| `completadas` | int | Total de actividades completadas |
| `pendientes` | int | Total de actividades pendientes |
| `total` | int | Total de actividades |
| `cursoTop` | object | Curso con más actividades **pendientes** (o `null` si no hay cursos). Incluye `totalActividades`, `completadas` y `pendientes` |
| `cursos` | array | Lista de cursos del usuario con `totalActividades` y `completadas` (para calcular % por curso en gráfico pastel) |

---

## 5. Health Check

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
