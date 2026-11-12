const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const router  = express.Router();

router.post('/registro', async (req, res) => {
    try {
        const { nombre, email, password, departamento, municipio } = req.body;
        const existe = await Usuario.findOne({ email });
        if (existe) return res.status(400).json({ error: 'El email ya está registrado' });

        const hash = await bcrypt.hash(password, 10);

        const usuario = await Usuario.create({
            nombre,
            email,
            departamento,
            municipio,
            password: hash,
            rol: 'cliente'
        });

        res.status(201).json({ mensaje: 'Usuario creado correctamente', id: usuario._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(401).json({ error: 'Email o contraseña incorrectos' });

        const valida = await bcrypt.compare(password, usuario.password);
        if (!valida) return res.status(401).json({ error: 'Email o contraseña incorrectos' }); 

        const token = jwt.sign(
            { id: usuario._id, email: usuario.email, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, nombre: usuario.nombre, rol: usuario.rol });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const verificarToken = require('../middleware/auth');
router.get('/perfil', verificarToken, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select('-password');
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (err) { 
      res.status(500).json({ error: err.message }); 
  }
});

module.exports = router;