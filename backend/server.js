require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Producto = require('./models/Producto');
const authRoutes = require('./routes/auth');
const verificarToken = require('./middleware/auth');
const productosRoutes = require('./routes/productos');
const ordenesRoutes = require('./routes/ordenes');
const pagoRoutes = require('./routes/pago');
const contactoRoutes = require('./routes/contacto');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const modo = process.env.DB_MODO === 'local' ? 'local' : 'atlas';
const uri = modo === 'local' ? process.env.MONGODB_URI_LOCAL : process.env.MONGODB_URI_ATLAS;

mongoose.connect(uri)
  .then(() => console.log('Conectado a MongoDB (' + modo + ')'))
  .catch((err) => console.error('Error de conexion:', err));

app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor TechStore Pro', baseDeDatos: modo });
});

app.listen(PORT, () => {
  console.log('Servidor en http://localhost:' + PORT);
});

app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/ordenes', ordenesRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/contacto', contactoRoutes);