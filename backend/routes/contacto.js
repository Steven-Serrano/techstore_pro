const express = require('express');
const Mensaje = require('../models/Mensaje');
const router  = express.Router();

router.post('/', async (req, res) => {
  try {
    const { nombre, email, telefono, asunto, mensaje } = req.body;
    await Mensaje.create({ nombre, email, telefono, asunto, mensaje });
    res.status(201).json({ mensaje: 'Mensaje recibido' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const primero = Object.values(err.errors)[0].message;
      return res.status(400).json({ error: primero });
    }
    res.status(500).json({ error: 'Error al guardar el mensaje' });
  }
});

module.exports = router;
