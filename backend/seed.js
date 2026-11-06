require('dotenv').config();
const mongoose = require('mongoose');
const Producto = require('./models/Producto');
const productos = require('../frontend/data/productos.json');

async function sembrar() {
  if (process.env.DB_MODO !== 'local') {
    console.error('❌ El seed solo corre con DB_MODO=local en el .env. No se hizo nada.');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI_LOCAL);
  await Producto.deleteMany({});
  await Producto.insertMany(productos);
  console.log('✅ Productos sembrados en la base local: ' + productos.length);
  await mongoose.disconnect();
}

sembrar().catch((err) => {
  console.error('❌ Error en el seed:', err.message);
  process.exit(1);
});