//importar mongoose para usar schema y model
const mongoose = require('mongoose');

// Shema: define los campos de cada documento en atlas 
const productoSchema = new mongoose.Schema({
    id :          { type: Number, required: true },
    icono :       { type: String, required: true },
    nombre :      { type: String, required: true },
    descripcion : { type: String, required: true },
    precio :      { type: String, required: true },
    imagen :      { type: String, required: true },
});

// crea el model - mongoose buscla la coleccion 'productos' en atlas 
const Producto = mongoose.model('Producto', productoSchema);

//exportar para poder usarlo en server.js
module.exports = Producto;