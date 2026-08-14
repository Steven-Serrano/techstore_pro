const express = require('express');
const cors = require ('cors');
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

app.get('/api/productos', (req, res) => {
    const productos = require('../frontend/data/productos.json');
    res.json(productos);
});

app.get('/', (req, res) => {
    res.json({mensaje: 'Servidor TechStore pro ✅'})
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});