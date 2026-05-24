# API Testing — Integrante 3 (Agenda)

URL base: `http://localhost:3000/api`

---

## Actividades

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/actividades` | Todas las actividades (para puntos en calendario) |
| `GET` | `/api/actividades?fecha=YYYY-MM-DD` | Actividades de un día específico |
| `GET` | `/api/actividades?fechaInicio=X&fechaFin=Y` | Actividades en un rango de fechas |
| `POST` | `/api/actividades` | Crear una actividad |
| `PATCH` | `/api/actividades/:id` | Editar / marcar completada |
| `DELETE` | `/api/actividades/:id` | Eliminar una actividad |

**POST /api/actividades — Body:**
```json
{
  "titulo": "Examen parcial",
  "fecha": "2026-06-15",
  "id_curso": 1,
  "tipo": "Examen",
  "hora": "10:00",
  "prioridad": 2,
  "descripcion": "Repasar derivadas"
}
```

**Campos:**
| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| `titulo` | **Sí** | Título |
| `fecha` | **Sí** | `YYYY-MM-DD` |
| `id_curso` | No | ID del curso (usar `-1` para sin curso) |
| `tipo` | No | `"Tarea"`, `"Examen"` o `"Exposición"` |
| `hora` | No | `HH:MM` |
| `prioridad` | No | `0` = Baja, `1` = Media, `2` = Alta |
| `descripcion` | No | Texto libre |

---

## Cursos (para el spinner en AddTaskFragment)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/cursos` | Lista de cursos del usuario |

---

## ⚠️ Advertencias — LEE CON ATENCIÓN

### 🔴 CRÍTICO: Formato de fecha

El frontend actualmente maneja fechas como `"21 mayo 2026"` (formato `"d MMMM yyyy"`). **La API solo acepta y devuelve `"yyyy-MM-dd"`**.

**Necesitas convertir en ambos sentidos:**

```
Frontend (SQLite): "21 mayo 2026"  
      ↓
API:              "2026-05-21"
      ↓
Frontend (UI):    "21 mayo 2026"
```

Ejemplo en Java:
```java
// Display → API: "21 mayo 2026" → "2026-05-21"
SimpleDateFormat displayFmt = new SimpleDateFormat("d MMMM yyyy", new Locale("es", "ES"));
SimpleDateFormat apiFmt = new SimpleDateFormat("yyyy-MM-dd", Locale.US);
Date date = displayFmt.parse("21 mayo 2026");
String apiDate = apiFmt.format(date);  // "2026-05-21"

// API → Display: "2026-05-21" → "21 mayo 2026"
Date date2 = apiFmt.parse("2026-05-21");
String displayDate = displayFmt.format(date2);  // "21 mayo 2026"
```

### Otras advertencias

1. **`id_curso = -1`**: Cuando el usuario no selecciona un curso, el frontend actualmente envía `-1`. La API lo interpreta como `null` (sin curso). **No envíes `0` ni `null` directamente, envía `-1`.**
2. **Token**: Todos los endpoints requieren `Authorization: Bearer <token>`. Si recibes `401`, redirige a LoginActivity.
3. **IDs como Int**: La API devuelve `id` como número entero, no como `long`.
