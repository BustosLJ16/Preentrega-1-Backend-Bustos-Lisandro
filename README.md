#Preentrega #1 - Programación BackEnd avanzado I.

##Este proyecto es una preentrega la cual fue realizada para el curso de Programación de BackEnd avanzado I de CoderHouse.
En dicho proyecto, veremos las rutas utilizadas, las cuales fueron establecidas bajo el **Puerto 8080** de Localhost, utilizando el servicio de Postman como medio de preferencia de flujo de datos.

## **Rutas de los Productos**:

1. Ruta Post - Creación de un producto (http://localhost:8080/api/products)
   - Formato del producto:
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
     - products/:pid - Producto Individual con su respectivo ID.
     - products?limit=x - Lista de productos con un limite de visualización de los mismos.
  
3. Ruta Put - Actualización de un producto según su ID (http://localhost:8080/api/products/:pid)
   - Formato del producto:
   {
    "title": "Example-title",
    "description": "Example-Description",
    "code": "Example-code",
    "price": 1,
    "status": true,
    "stock": 1,
    "category": "Example-Category" 
  }

4. Ruta Delete -  Eliminación de un producto seleccionado (http://localhost:8080/api/products/:pid)
   - products/:pid - Producto a Eliminar determinado por su respectivo ID en la lista de productos generados.

  
## **Rutas del Carrito**:

1. Ruta Post - Creación de un Nuevo Carrito (http://localhost:8080/api/cart)

2. Ruta Post - Agregar un Nuevo Producto a un determinado Carrito (http://localhost:8080/api/cart/:cid/product/:pid)
   - CID: Es el ID determinado del carrito al que desea agregar el producto.
   - PID: Es el ID determinado del producto el cual desea agregar al carrito.

3. Ruta Get - Obtención de la lista de los Carritos tanto individual como general (http://localhost:8080/api/cart/)
   Formato de busqueda:
   - cart/carts - Lista general de los Carritos y sus Productos.
   - cart/:CID - Lista de los productos dentro de un Carrito determinado.
  
4. Ruta Delete - Eliminación de un Carrito Seleccionado (http://localhost:8080/api/cart/:CID)
   - cart/:cid - Determina el Carrito a Eliminar por su respectivo ID en la lista de Carritos generados.
