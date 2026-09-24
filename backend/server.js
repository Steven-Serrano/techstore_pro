// 1. IMPORTAR LAS DEPENDENCIAS 

require('dotenv').config();
const express         = require('express');
const cors            = require('cors');
const mongoose        = require('mongoose');
const Producto        = require('./models/Producto');
const authRoutes      = require('./routes/auth');   
const verificarToken  = require('./middleware/auth');
const productosRoutes = require('./routes/productos')
const ordenesRoutes   = require('./routes/ordenes')
const pagoRoutes      = require('./routes/pago');  // ← AGREGAR S18A


// 2. CREAR LA APICACION Y DEFINIR EL PUERTO 

const app = express();
const PORT = process.env.PORT || 3000;

// 3. ACTIVAR MIDDLEWARES

app.use(cors());
app.use(express.json());

// 4. CONECTAR A MONGODB ATLAS

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ Conectado a MongoDB Atlas');
    })
    .catch((err) => {
        console.error('❌ Error de conexión a MongoDB Atlas:');
        console.error(err.message);
    });

// 9. RUTA DE PRUEBA 

app.get('/', (req, res) => {
    res.json({mensaje: 'Servidor TechStore Pro ✅'});
});

// 10. ARRANCAR EL SERVIDOR 

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});

// 11. RUTAS DE AUTENTICACIÓN

app.use('/api/auth', authRoutes);

// 12. Rutas de productos 

app.use('/api/productos', productosRoutes);

// 13. Rutas de órdenes 

app.use('/api/ordenes', ordenesRoutes);

//14. ruta de pago
app.use('/api/pagos', pagoRoutes);  // ← AGREGAR S18A
