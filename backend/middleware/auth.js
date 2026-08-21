// libreria oficial para crear y verificar tokens JWT
const jwt = require('jsonwebtoken');

// middleware para verificar el token JWT en el header Authoriation
function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // extraer el token despues de "bearer"

    if (!token) return res.status(401).json({error: 'Acceso denegado - token requerido'});
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded; // datos del usuario disponibles en la ruta
        next();                // continuar con la ruta protegida
    } catch (err) {
        res.status(403).json({ error: 'Token invalido o expirado'});

        }
    }


    module.exports = verificarToken;