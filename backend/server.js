require('dotenv').config();
const express = require('express');
const cors = require ('cors');
const mongoose = require('mongoose');
const Producto = require('./models/Producto');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ conectado a MongoDB Atlas'))
    .catch((err) => console.error('❌ error de conexion', err));


app.get('/productos', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});



app.post('/api/productos', async (req, res) => {
    try {
        const nuevoProducto = await Producto.create(req.body);
        res.status(201).json(nuevoProducto);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});


app.put('/api/productos/:id', async (req, res) => {
    try{
        const actualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        if(!actualizado)return res.status(404).json({error: 'Producto no encontrado'});
        res.json(actualizado);
    } catch (err){
        res.status(400).json({errror: err.message});
    }
});



app.delete('/api/productos/:id', async (req, res) => {
    try{
        const eliminado = await Producto.findByIdAndDelete(req.params.id);
        if (eliminado) return res.status(404).json({error: 'producto no encontrado'});
        res.json({mensaje: 'producto eliminado correctamente', eliminado});
    } catch (err){
        res.status(400).json({error: err.message});
    }
});


//9    
app.get('/', (req, res) => {
    res.json({mensaje: 'Servidor TechStore pro ✅'})
});


//10
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
