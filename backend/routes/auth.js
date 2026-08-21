// 1 importar dependencias 
const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const router  = express.Router();

//2 POST crear cuenta
router.post('/registro', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // verificar que el email no exista ya
        const existe = await Usuario.findOne({ email });
        if (existe) return res.status(400).json({ error: 'el email ya esta registrado' });

        // encriptar la coontraseña con 10 rondas de bcrypt
        const hash = await bcrypt.hash(password, 10);

        // guardar el usuario con la contraseña encriptada
        const usuario = await Usuario.create({ nombre, email, password: hash });

        res.status(201).json({ mensaje: 'usuario creado correctamente', id: usuario._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 3. POST /api/auth/login - iniciar sesion y recibir token
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por email
        const usuario = await Usuario.findOne({email});
        if (!usuario) return res.status(401).json({ error: 'Email o contraseña incorrectos'});

        // comparar la contraseña con el hash guardado en atlas
        const valida = await bcrypt.compare(password, usuario.password);
        if (!valida) return res.status(401).json({ error: 'Email o contraseña incorretos'}); 

        // crear el token con jwt - dura 24 horas
        const token = jwt.sign(
            { id: usuario._id, email: usuario.email},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );

        res.json({token, nombre: usuario.nombre});
    } catch (err){
        res.status(500).json({errror: err.message});
    }
});

// 4. exportar el router
module.exports = router;