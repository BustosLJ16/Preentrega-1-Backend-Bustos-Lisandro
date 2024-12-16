Este preentrega fue realizada para el curso de Programación de BackEnd I de Coder House.

Las rutas utilizadas en dicho proyecto, fueron establecidas bajo el Puerto 8080 de Localhost, utilizando Postman como medio de preferencia de flujo de datos.

## Rutas de los Productos:

1. Ruta Post - Creación de un producto (http://localhost:8080/api/products)
   Formato del producto:
   {
    "title": "Example-title",
    "description": "Example-Description",
    "code": "Example-code",
    "price": 1,
    "status": true,
    "stock": 1,
    "category": "Example-Category" 
  }

2. Ruta Get - Obtención de la lista de productos generados (http://localhost:8080/api/products)
   Formato de busquedas:
     - products/:pid = Producto Individual con su respectivo ID.
     - products?limit=x = Lista de productos con un limite de visualización de los mismos.
