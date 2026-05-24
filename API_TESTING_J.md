# API Testing — Integrante 4 (Ajustes)

URL base: `http://localhost:3000/api`

---

## Perfil

| Método | Endpoint | Auth | Body |
|--------|----------|------|------|
| `GET` | `/api/auth/me` | Sí | — |
| `PUT` | `/api/auth/me` | Sí | `{ nombre?, email? }` |

**GET /api/auth/me — Respuesta:**
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@example.com"
}
```

**PUT /api/auth/me — Body (solo los campos a modificar):**
```json
{
  "nombre": "Juan Carlos Pérez",
  "email": "juancarlos@example.com"
}
```

---

## Contraseña

| Método | Endpoint | Auth | Body |
|--------|----------|------|------|
| `PUT` | `/api/auth/password` | Sí | `{ contrasenaActual, contrasenaNueva }` |

**Body:**
```json
{
  "contrasenaActual": "123456",
  "contrasenaNueva": "nuevaClave2026"
}
```

> `contrasenaNueva` debe tener al menos 6 caracteres.

**Respuesta:**
```json
{
  "mensaje": "Contraseña actualizada correctamente"
}
```

---

## Cerrar sesión

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| `POST` | `/api/auth/logout` | Sí | El servidor responde OK, el cliente debe limpiar el token |

---

## ⚠️ Advertencias

1. **Token**: Todos los endpoints requieren `Authorization: Bearer <token>`. Si recibes `401`, redirige a LoginActivity.
2. **Al cerrar sesión**: Además de llamar a `POST /api/auth/logout`, debes limpiar el token de SharedPreferences para que no quede sesión abierta.
3. **Al editar perfil**: Si el email ya está registrado por otro usuario, la API responde `409 Conflict`. Muestra un mensaje claro al usuario.
4. **Local vs API**: El tema oscuro y las notificaciones se siguen manejando con `SettingsPreferenceManager` (local). Solo perfil, contraseña y logout van contra la API.
