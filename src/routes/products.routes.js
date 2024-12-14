import { Router } from "express";
import fs from 'fs';

const productsRoutes = Router();

const getProducts = async () =>{
    try {
        const productsList = await fs.promises.readFile('src/db/products.json', 'utf-8')
        const productsConverted = JSON.parse(productsList)
        return productsConverted
    } catch (error) {
        return []     
    }
}

const saveProducts = async (products) => {
    try {
        const parsedProducts = JSON.stringify(products)
        await fs.promises.writeFile('src/db/products.json', parsedProducts, 'utf-8')
        return true
    } catch (error) {
        console.log({error});
        
        return false
    }
}

const getSingleProductById = async (pId) => {
    const products = await getProducts()
    const product = products.find(p => p.id === pId)
    return product
}

// Limite con el QueryParam
productsRoutes.get('/', async (req, res)=> {
    const limit = +req.query.limit;
    const productsList = await getProducts()
    if(isNaN(limit) || !limit){
        return res.send({productsList})
    }
    const productsListLimited = productsList.slice(0, limit)
    res.send({productsList: productsListLimited})
})

productsRoutes.get('/:pid', async (req, res) => {
    const pId = +req.params.pid
    const product = await getSingleProductById(pId)
    if(!product){
        return res.status(404).send({status: 'error', message: 'Product not found'})
    }
    res.send({product})
})


productsRoutes.post('/', async (req, res) => {
    const product = req.body
    product.id = Math.floor(Math.random() * 1000)
    if(!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category){
        res.status(400).send({status: 'error', message: 'Product incompleted'})
    }
    const products = await getProducts()
    products.push(product)
    const isOk = await saveProducts(products)
    if(!isOk){
        res.send({status: 'error', message: 'Product could not add'})
    }
    return res.send({status: 'ok', message: 'Product Added'})
})

productsRoutes.delete('/:pid', async (req, res)=> {
    const id = +req.params.pid
    const product = await getSingleProductById(id)
    if(!product){
        return res.status(404).send({status: 'error', message: 'Product not found'})
    }
    const products = await getProducts()
    const filteredProducts = products.filter(p => p.id !== id)
    const isOk = await saveProducts(filteredProducts)
    if(!isOk){
        return res.status(404).send({status: 'error', message: 'Something went wrong'})
    }
    res.send({status: 'ok', message: 'Product deleted'})
})

productsRoutes.put('/:pid', async (req, res) => {
    const pId = +req.params.pid; // Convertir pid a número
    const productToUpdate = req.body;

    // Validar que todos los campos necesarios estén presentes
    const requiredFields = ['title', 'description', 'code', 'price', 'status', 'stock', 'category'];
    const missingFields = requiredFields.filter(field => !productToUpdate[field]);
    if (missingFields.length > 0) {
        return res.status(400).send({ status: 'error', message: `Missing fields: ${missingFields.join(', ')}` });
    }

    const products = await getProducts(); // Obtener todos los productos
    const productIndex = products.findIndex(p => p.id === pId); // Buscar el índice del producto

    if (productIndex === -1) {
        return res.status(404).send({ status: 'error', message: 'Product not found' });
    }

    // Actualizar solo el producto seleccionado
    products[productIndex] = {
        ...products[productIndex], // Mantener los datos actuales del producto
        ...productToUpdate,       // Sobrescribir con los nuevos datos
        id: pId                   // Asegurar que el ID no cambie
    };

    // Guardar los productos actualizados
    const isOk = await saveProducts(products);
    if (!isOk) {
        return res.status(500).send({ status: 'error', message: 'Something went wrong while saving' });
    }

    res.send({ status: 'ok', message: 'Product updated successfully' });
});


export default productsRoutes;