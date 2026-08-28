require('dotenv').config();
const express = require('express');
const cors = require ('cors');
const mongoose = require('mongoose');
const Producto = require('./models/Producto');
const authRoutes = require('./routes/auth');
const verificarToken = require('./middleware/auth');
const productosRoutes = require('./routes/productos');
const ordenesRoutes = require('./routes/ordenes')

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ conectado a MongoDB Atlas'))
    .catch((err) => console.error('❌ error de conexion', err));


//9    
app.get('/', (req, res) => {
    res.json({mensaje: 'Servidor TechStore pro ✅'})
});


//10
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});

// 11. rutas de autenticacion
app.use('/api/auth', authRoutes);

// 12 rutas de productos
app.use('/api/productos', productosRoutes);

// 13. ruta de ordenes
app.use('/api/ordenes', ordenesRoutes);
