import { Router } from "express";
import fs from 'fs/promises'; 

const cartRoutes = Router();

// Generar un Carrito Nuevo
cartRoutes.post('/', async (req, res) => {
    const cartId = Math.floor(Math.random() * 100000); // Generar un ID único para el carrito
    const cart = { id: cartId, products: [] }; // Crear el carrito inicial vacío

    try {
        const data = await fs.readFile('src/db/cart.json', 'utf-8');
        const carts = JSON.parse(data);
        carts.push(cart);

        await fs.writeFile('src/db/cart.json', JSON.stringify(carts, null, 2), 'utf-8');
        res.json(cart);
    } catch (err) {
        res.status(500).send({ status: 'error', message: 'Error al leer y/o guardar los archivos del carrito.' });
    }
});

// Ver todos los Carritos
cartRoutes.get('/carts', async (req, res) => {
    try {
        const data = await fs.readFile('src/db/cart.json', 'utf8');
        const carts = JSON.parse(data);

        res.json(carts); // Devolver todos los carritos
    } catch (err) {
        res.status(500).send({ status: 'error', message: 'Error a leer lista de los Carritos.' });
    }
});

// Agregar Productos al Carrito
cartRoutes.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const productData = await fs.readFile('src/db/products.json', 'utf-8');
        const products = JSON.parse(productData);
        
        const product = products.find(p => p.id === (isNaN(pid) ? pid : Number(pid))); // Chequeo y Busqueda de IDs

        if (!product) {
            return res.status(404).send({ status: 'error', message: 'El producto no ha sido encontrado.' });
        }

        // Leer datos del carrito desde el JSON
        const cartData = await fs.readFile('src/db/cart.json', 'utf-8');
        const carts = JSON.parse(cartData);
        const cart = carts.find(c => c.id === Number(cid));

        if (!cart) {
            return res.status(404).send({ status: 'error', message: `El Carrito con ID: ${cid} no ha sido encontrado.` });
        }

        // Verificación de que un producto este en el carrito
        const existingProduct = cart.products.find(p => p.id === (isNaN(pid) ? pid : Number(pid)));
        if (existingProduct) {
            existingProduct.quantity += 1; // Incremento la Quantity si existe
        } else {
            cart.products.push({
                id: product.id,
                quantity: 1
            });
        }

        // Guardado del carrito actualizado
        await fs.writeFile('src/db/cart.json', JSON.stringify(carts, null, 2), 'utf8');
        res.json(cart);
    } catch (err) {
        res.status(500).send({ status: 'error', message: 'Error en el manejo de Productos o de Carrito.' });
    }
});

// Ver los productos dentro del carrito según su ID
cartRoutes.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const data = await fs.readFile('src/db/cart.json', 'utf8');
        const carts = JSON.parse(data);
        const cart = carts.find(c => c.id === Number(cid));

        if (!cart) {
            return res.status(404).send({ status: 'error', message: 'Carrito no encontrado.' });
        }

        res.json(cart.products); // Devolver solo los productos del carrito
    } catch (err) {
        res.status(500).send({ status: 'error', message: 'Error al leer la lista del carrito.' });
    }
});

// Eliminar un carrito
cartRoutes.delete('/:cid', async (req, res)=> {
    const { cid } = req.params

    try{
        const data = await fs.readFile('src/db/cart.json', 'utf-8');
        const carts = JSON.parse(data)

        // Busco el Carrito según su ID para Eliminarlo
        const cartIndex = carts.findIndex(c => c.id === Number(cid));
        if(cartIndex === -1){
            return res.status(404).send({status: 'error', message: `El carrito con el ID: ${cid} no ha sido encontrado.`})
        }
        carts.splice(cartIndex, 1)

        await fs.writeFile('src/db/cart.json', JSON.stringify(carts, null, 2), 'utf-8')

        res.send({ status: 'ok', message: 'El Carrito fue Eliminado correctamente!' })

    } catch (err) {
        return res.status(500).send({status: 'error', message: 'Error al manejar los carritos.'})
    }
})

export default cartRoutes;
