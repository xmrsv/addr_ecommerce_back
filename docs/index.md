# Documentación de la API de Gestión de Órdenes y Productos

## Introducción

Esta API permite gestionar las órdenes y productos de un sistema de comercio electrónico. Proporciona funcionalidades para crear, leer, actualizar y eliminar órdenes y productos, así como para filtrar órdenes por estado o código de orden.

## Autenticación

Actualmente, la API no implementa un sistema de autenticación.

## Rutas

### Órdenes

**`/api/orders`**

- **Método:** `GET`
- **Descripción:** Obtiene todas las órdenes o las órdenes filtradas por estado o código de orden.
- **Parámetros de consulta:**
  - `estado`: (opcional) Estado de las órdenes a obtener (por ejemplo, "pendiente", "en proceso", "completado").
  - `ordenId`: (opcional) Código de orden de la orden a obtener.
- **Respuesta:**

    ```json
    [
      {
        "estado": "pendiente",
        "descripcionOrden": "Compra de 2 libros y 1 taza",
        "fechaSalida": "2023-10-27",
        "fechaEntrega": "2023-10-30",
        "ordenId": "ABC123",
        "OrderItems": [
          {
            "cantidad": 2,
            "Product": {
              "nombre": "Libro 1",
              "precio": 10.00
            }
          },
          {
            "cantidad": 1,
            "Product": {
              "nombre": "Taza",
              "precio": 5.00
            }
          }
        ]
      },
      {
        // ... más órdenes
      }
    ]
    ```

- **Método:** `POST`
- **Descripción:** Crea una nueva orden.
- **Cuerpo de la solicitud:**

    ```json
    {
      "estado": "pendiente",
      "descripcionOrden": "Compra de 1 laptop",
      "fechaSalida": "2023-11-05",
      "fechaEntrega": "2023-11-10",
      "items": [
        {
          "productId": 1,
          "cantidad": 1
        },
        {
          "productId": 2,
          "cantidad": 2
        }
      ]
    }
    ```
  
- **Respuesta:**

    ```json
    {
      "estado": "pendiente",
      "descripcionOrden": "Compra de 1 laptop",
      "fechaSalida": "2023-11-05",
      "fechaEntrega": "2023-11-10",
      "ordenId": "DEF456" 
    }
    ```

**`/api/orders/:orderId`**

- **Método:** `GET`
- **Descripción:** Obtiene una orden por su código de orden.
- **Parámetros de ruta:**
  - `orderId`: Código de orden de la orden a obtener.
- **Respuesta:**

    ```json
    {
      "estado": "pendiente",
      "descripcionOrden": "Compra de 2 libros y 1 taza",
      "fechaSalida": "2023-10-27",
      "fechaEntrega": "2023-10-30",
      "ordenId": "ABC123",
      "OrderItems": [
        {
          "cantidad": 2,
          "Product": {
            "nombre": "Libro 1",
            "precio": 10.00
          }
        },
        {
          "cantidad": 1,
          "Product": {
            "nombre": "Taza",
            "precio": 5.00
          }
        }
      ]
    }
    ```

- **Método:** `PUT`
- **Descripción:** Actualiza una orden (reemplaza completamente).
- **Parámetros de ruta:**
  - `orderId`: Código de orden de la orden a actualizar.
- **Cuerpo de la solicitud:**

    ```json
    {
      "estado": "en proceso",
      "descripcionOrden": "Compra de 2 libros, 1 taza y 1 bolígrafo",
      "fechaSalida": "2023-10-28",
      "fechaEntrega": "2023-11-02",
      "items": [
        {
          "productId": 1,
          "cantidad": 2
        },
        {
          "productId": 3,
          "cantidad": 1
        }
      ]
    }
    ```

- **Respuesta:**

    ```json
    {
      "estado": "en proceso",
      "descripcionOrden": "Compra de 2 libros, 1 taza y 1 bolígrafo",
      "fechaSalida": "2023-10-28",
      "fechaEntrega": "2023-11-02",
      "ordenId": "ABC123",
      "OrderItems": [
        {
          "cantidad": 2,
          "Product": {
            "nombre": "Libro 1",
            "precio": 10.00
          }
        },
        {
          "cantidad": 1,
          "Product": {
            "nombre": "Bolígrafo",
            "precio": 2.00
          }
        }
      ]
    }
    ```

- **Método:** `DELETE`
- **Descripción:** Elimina una orden por su código de orden.
- **Parámetros de ruta:**
  - `orderId`: Código de orden de la orden a eliminar.
- **Respuesta:**
  - Código de estado `204 No Content` si la orden se eliminó correctamente.
  - Código de estado `404 Not Found` si la orden no se encontró.

#### Productos

**`/api/products`**

- **Método:** `GET`
- **Descripción:** Obtiene todos los productos.
- **Respuesta:**

    ```json
    [
      {
        "id": 1,
        "nombre": "Libro 1",
        "descripcion": "Descripción del libro 1",
        "precio": 10.00,
        "imagen": "https://example.com/libro1.jpg",
        "stock": 10
      },
      {
        // ... más productos
      }
    ]
    ```

- **Método:** `POST`
- **Descripción:** Crea un nuevo producto.
- **Cuerpo de la solicitud:**

    ```json
    {
      "nombre": "Nuevo producto",
      "descripcion": "Descripción del nuevo producto",
      "precio": 20.00,
      "imagen": "https://example.com/nuevoproducto.jpg",
      "stock": 5
    }
    ```

- **Respuesta:**

  ```json
  {
    "id": 4,
    "nombre": "Nuevo producto",
    "descripcion": "Descripción del nuevo producto",
    "precio": 20.00,
    "imagen": "https://example.com/nuevoproducto.jpg",
    "stock": 5
  }
  ```

**`/api/products/:productId`**

- **Método:** `GET`
- **Descripción:** Obtiene un producto por su ID.
- **Parámetros de ruta:**
  - `productId`: ID del producto a obtener.
- **Respuesta:**

    ```json
    {
      "id": 1,
      "nombre": "Libro 1",
      "descripcion": "Descripción del libro 1",
      "precio": 10.00,
      "imagen": "https://example.com/libro1.jpg",
      "stock": 10
    }
    ```

- **Método:** `PUT`
- **Descripción:** Actualiza un producto (reemplaza completamente).
- **Parámetros de ruta:**
  - `productId`: ID del producto a actualizar.
- **Cuerpo de la solicitud:**

  ```json
  {
    "nombre": "Libro 1 (actualizado)",
    "descripcion": "Descripción del libro 1 (actualizada)",
    "precio": 12.00,
    "imagen": "https://example.com/libro1_actualizado.jpg",
    "stock": 8
  }
  ```

- **Respuesta:**

    ```json
    {
      "id": 1,
      "nombre": "Libro 1 (actualizado)",
      "descripcion": "Descripción del libro 1 (actualizada)",
      "precio": 12.00,
      "imagen": "https://example.com/libro1_actualizado.jpg",
      "stock": 8
    }
    ```

- **Método:** `DELETE`
- **Descripción:** Elimina un producto por su ID.
- **Parámetros de ruta:**
  - `productId`: ID del producto a eliminar.
- **Respuesta:**
  - Código de estado `204 No Content` si el producto se elimin+o correctamente.
  - Código de estado `404 Not Found` si el producto no se encontró.

## Códigos de estado HTTP

- `200 OK`: La solicitud se completó correctamente.
- `201 Created`: La solicitud se completó correctamente y se creó un nuevo recurso.
- `204 No Content`: La solicitud se completó correctamente pero no hay contenido que devolver.
- `404 Not Found`: El recurso solicitado no se encontró.
- `500 Internal Server Error`: Se produjo un error en el servidor.

## Ejemplos de uso

**Obtener todas las órdenes:**

```http
GET /api/orders
```

**Obtener las órdenes con estado "pendiente":**

```http
GET /api/orders?estado=pendiente
```

**Obtener la orden con código de orden "ABC123":**

```http
GET /api/orders/ABC123
```

**Crear una nueva orden:**

```http
POST /api/orders
```

**Actualizar la orden con código de orden "ABC123":**

```http
PUT /api/orders/ABC123
```

**Eliminar la orden con código de orden "ABC123":**

```http
DELETE /api/orders/ABC123
```

**Obtener todos los productos:**

```http
GET /api/products
```

**Obtener el producto con ID 1:**

```http
GET /api/products/1
```

**Crear un nuevo producto:**

```http
POST /api/products
```

**Actualizar el producto con ID 1:**

```http
PUT /api/products/1
```

**Eliminar el producto con ID 1:**

```http
DELETE /api/products/1
```

## Notas

- Esta documentación está sujeta a cambios.
- Para cualquier duda o consulta, contacta con el desarrollador de la API.
