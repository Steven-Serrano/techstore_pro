const express = require('express');
const Orden  = require('../models/orden');
const verificarToken = require('../middleware/auth');
const router = express.Router();

// POST /api/ordenes - crea una orden
// EL usuario logueado crea su propia orden

router.post('/', verificarToken, async (req, res) => {
try {
    const {productos, total} = req.body;
    const nuevaOrden = await Orden.create({
        usuario: req.usuario.id,
        productos,
        total
    });
    res.status(201).json(nuevaOrden);
} catch (error) {
    res.status(400).json({ error: error.message });
}
});

// GET /api/ordenes - mis ordenes}
router.get('/', verificarToken, async (req, res) => {
    try { 
        const ordenes = await Orden
        .find({ usuario: req.usuario.id})
        .populate('usuario','nombre email')
        .populate('productos.producto', 'nombre precio');
    res.json(ordenes);
    }catch(err) {
        res.status(500).json({error: err.message});
    }
    });

    module.exports = router;
