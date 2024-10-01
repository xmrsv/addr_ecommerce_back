# doc

## Documentación de la API de Ecommerce

### Rutas de productos

**`/api/products`**

- **Método:** `GET`
- **Descripción:** Obtiene todos los productos.
- **Respuesta:**

```json
[
  {
    "id": 1,
    "nombre": "iPhone XR",
    "descripcion": "Un celular muy bonito",
    "precio": "750.00",
    "imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1sGEiTSYco4q8d3FUWH7tMVBQf-iv06LG4A&s",
    "stock": 5,
    "productCode": "IPHONE-XR",
    "createdAt": "2024-09-09T22:09:33.000Z",
    "updatedAt": "2024-09-09T22:09:33.000Z"
  }
  // ... más productos
]
```

**Ejemplo de petición cURL:**

```bash
curl http://localhost:3000/api/products
```

**`/api/products/:productCode`**

- **Método:** `GET`
- **Descripción:** Obtiene un producto por su código.
- **Parámetros:**
  - `productCode`: Código del producto.
- **Respuesta:**

```json
{
  "id": 1,
  "nombre": "iPhone XR",
  "descripcion": "Un celular muy bonito",
  "precio": "750.00",
  "imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1sGEiTSYco4q8d3FUWH7tMVBQf-iv06LG4A&s",
  "stock": 5,
  "productCode": "IPHONE-XR",
  "createdAt": "2024-09-09T22:09:33.000Z",
  "updatedAt": "2024-09-09T22:09:33.000Z"
}
```

**Ejemplo de petición cURL:**

```bash
curl http://localhost:3000/api/products/IPHONE-XR
```

- **Método:** `PUT`
- **Descripción:** Actualiza un producto.
- **Parámetros:**
  - `productCode`: Código del producto.
- **Cuerpo de la petición:**

```json
{
  "nombre": "iPhone XR (Actualizado)",
  "descripcion": "Un celular muy bonito (Actualizado)",
  "precio": "800.00",
  "imagen": "https://example.com/imagen.jpg",
  "stock": 10
}
```

**Ejemplo de petición cURL:**

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"nombre": "iPhone XR (Actualizado)", "descripcion": "Un celular muy bonito (Actualizado)", "precio": "800.00", "imagen": "https://example.com/imagen.jpg", "stock": 10}' http://localhost:3000/api/products/IPHONE-XR
```

- **Método:** `DELETE`
- **Descripción:** Elimina un producto.
- **Parámetros:**
  - `productCode`: Código del producto.
- **Respuesta:**
  - Código de estado 204 (No Content) si el producto se eliminó correctamente.

**Ejemplo de petición cURL:**

```bash
curl -X DELETE http://localhost:3000/api/products/IPHONE-XR
```

**`/api/products`**

- **Método:** `POST`
- **Descripción:** Crea un nuevo producto.
- **Cuerpo de la petición:**

```json
{
  "nombre": "Nuevo producto",
  "descripcion": "Descripción del nuevo producto",
  "precio": "100.00",
  "imagen": "https://example.com/imagen.jpg",
  "stock": 5,
  "productCode": "NUEVO-PRODUCTO"
}
```

**Ejemplo de petición cURL:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"nombre": "Nuevo producto", "descripcion": "Descripción del nuevo producto", "precio": "100.00", "imagen": "https://example.com/imagen.jpg", "stock": 5, "productCode": "NUEVO-PRODUCTO"}' http://localhost:3000/api/products
```

### Rutas de órdenes

**`/api/orders`**

- **Método:** `GET`
- **Descripción:** Obtiene todas las órdenes del usuario autenticado.
- **Cabeceras:**
  - `Authorization`: `Bearer <token>` (token JWT).
- **Respuesta:**

```json
[
  {
    "estado": "pendiente",
    "descripcionOrden": "para adrian",
    "fechaEnvio": "2024-09-14",
    "fechaEntregaEstimada": "2024-09-16",
    "ordenId": "BZONX8",
    "createdAt": "2024-09-15T07:37:45.000Z",
    "updatedAt": "2024-09-15T07:37:45.000Z",
    "OrderItems": [
      {
        "cantidad": 3,
        "Product": {
          "nombre": "iPhone XR",
          "precio": "750.00"
        }
      },
      {
        "cantidad": 2,
        "Product": {
          "nombre": "Mouse Logitech G703",
          "precio": "230.00"
        }
      }
    ]
  }
]
```

**Ejemplo de petición cURL:**

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/orders
```

**`/api/orders/:orderId`**

- **Método:** `GET`
- **Descripción:** Obtiene una orden por su ID, solo si pertenece al usuario autenticado.
- **Parámetros:**
  - `orderId`: ID de la orden.
- **Cabeceras:**
  - `Authorization`: `Bearer <token>` (token JWT).
- **Respuesta:**

```json
{
  "estado": "pendiente",
  "descripcionOrden": "para adrian",
  "fechaEnvio": "2024-09-14",
  "fechaEntregaEstimada": "2024-09-16",
  "ordenId": "BZONX8",
  "createdAt": "2024-09-15T07:37:45.000Z",
  "updatedAt": "2024-09-15T07:37:45.000Z",
  "OrderItems": [
    {
      "cantidad": 3,
      "Product": {
        "nombre": "iPhone XR",
        "precio": "750.00"
      }
    },
    {
      "cantidad": 2,
      "Product": {
        "nombre": "Mouse Logitech G703",
        "precio": "230.00"
      }
    }
  ]
}
```

**Ejemplo de petición cURL:**

```bash
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/orders/BZONX8
```

- **Método:** `PUT`
- **Descripción:** Actualiza una orden.
- **Parámetros:**
  - `orderId`: ID de la orden.
- **Cabeceras:**
  - `Authorization`: `Bearer <token>` (token JWT).
- **Cuerpo de la petición:**

```json
{
  "estado": "en proceso",
  "descripcionOrden": "para adrian (actualizado)",
  "fechaEnvio": "2024-09-15",
  "fechaEntregaEstimada": "2024-09-17",
  "items": [
    {
      "productCode": "IPHONE-XR",
      "cantidad": 2
    },
    {
      "productCode": "OTRO-PRODUCTO",
      "cantidad": 1
    }
  ]
}
```

**Ejemplo de petición cURL:**

```bash
curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"estado": "en proceso", "descripcionOrden": "para adrian (actualizado)", "fechaEnvio": "2024-09-15", "fechaEntregaEstimada": "2024-09-17", "items": [{"productCode": "IPHONE-XR", "cantidad": 2}, {"productCode": "OTRO-PRODUCTO", "cantidad": 1}]}' http://localhost:3000/api/orders/BZONX8
```

- **Método:** `DELETE`
- **Descripción:** Elimina una orden.
- **Parámetros:**
  - `orderId`: ID de la orden.
- **Cabeceras:**
  - `Authorization`: `Bearer <token>` (token JWT).
- **Respuesta:**
  - Código de estado 204 (No Content) si la orden se eliminó correctamente.

**Ejemplo de petición cURL:**

```bash
curl -X DELETE -H "Authorization: Bearer <token>" http://localhost:3000/api/orders/BZONX8
```

**`/api/orders`**

- **Método:** `POST`
- **Descripción:** Crea una nueva orden.
- **Cabeceras:**
  - `Authorization`: `Bearer <token>` (token JWT).
- **Cuerpo de la petición:**

```json
{
  "estado": "pendiente",
  "descripcionOrden": "Nueva orden",
  "fechaEnvio": "2024-09-20",
  "fechaEntregaEstimada": "2024-09-22",
  "items": [
    {
      "productCode": "IPHONE-XR",
      "cantidad": 1
    },
    {
      "productCode": "LOGITECH-G703",
      "cantidad": 2
    }
  ]
}
```

**Ejemplo de petición cURL:**

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"estado": "pendiente", "descripcionOrden": "Nueva orden", "fechaEnvio": "2024-09-20", "fechaEntregaEstimada": "2024-09-22", "items": [{"productCode": "IPHONE-XR", "cantidad": 1}, {"productCode": "LOGITECH-G703", "cantidad": 2}]}' http://localhost:3000/api/orders
```

### Rutas de autenticación

**`/api/auth/register`**

- **Método:** `POST`
- **Descripción:** Registra un nuevo usuario.
- **Cuerpo de la petición:**

```json
{
  "username": "nuevo_usuario",
  "password": "contraseña_segura",
  "email": "nuevo_usuario@example.com",
  "firstName": "Nuevo",
  "lastName": "Usuario"
}
```

**Ejemplo de petición cURL:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "nuevo_usuario", "password": "contraseña_segura", "email": "nuevo_usuario@example.com", "firstName": "Nuevo", "lastName": "Usuario"}' http://localhost:3000/api/auth/register
```

**`/api/auth/login`**

- **Método:** `POST`
- **Descripción:** Inicia sesión un usuario.
- **Cuerpo de la petición:**

```json
{
  "username": "usuario_existente",
  "password": "contraseña_correcta"
}
```

**Ejemplo de petición cURL:**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "usuario_existente", "password": "contraseña_correcta"}' http://localhost:3000/api/auth/login
```

### Rutas de usuarios

**`/api/users/:userId/approve`**

- **Método:** `PUT`
- **Descripción:** Aprueba un usuario (solo para administradores).
- **Parámetros:**
  - `userId`: ID del usuario a aprobar.
- **Cabeceras:**
  - `Authorization`: `Bearer <token>` (token JWT de un administrador).
- **Respuesta:**

```json
{
  "message": "User approved"
}
```

**Ejemplo de petición cURL:**

```bash
curl -X PUT -H "Authorization: Bearer <token>" http://localhost:3000/api/users/123/approve
```

### Códigos de estado HTTP

- `200 OK`: La solicitud se completó correctamente.
- `201 Created`: La solicitud se completó correctamente y se creó un nuevo recurso.
- `204 No Content`: La solicitud se completó correctamente pero no hay contenido que devolver.
- `400 Bad Request`: La solicitud es inválida.
- `401 Unauthorized`: El usuario no está autenticado.
- `403 Forbidden`: El usuario no tiene permiso para acceder al recurso.
- `404 Not Found`: El recurso solicitado no se encontró.
- `500 Internal Server Error`: Se produjo un error en el servidor.

### Notas

- Esta documentación está sujeta a cambios.
- Para cualquier duda o consulta, contacta con el desarrollador de la API.
- Asegúrate de que tu backend esté configurado correctamente con la clave secreta del JWT y las opciones de CORS.
- Recuerda que aún falta implementar la lógica para obtener la lista de usuarios, obtener un usuario por ID, actualizar un usuario y eliminar un usuario.
