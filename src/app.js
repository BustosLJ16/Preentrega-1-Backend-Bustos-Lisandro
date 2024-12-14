import express from 'express'
import productsRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js';

const PORT = 8080
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Usando rutas de Express
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes)

// Uso del puerto 8080 para subir el servidor
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
})