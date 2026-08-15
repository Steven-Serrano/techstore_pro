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

    
app.get('/', (req, res) => {
    res.json({mensaje: 'Servidor TechStore pro ✅'})
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
