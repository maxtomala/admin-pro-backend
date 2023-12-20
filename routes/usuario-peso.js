// routes/usuario-peso.routes.js
const { Router } = require('express');

const {
    obtenerPesos,
    guardarPeso,
    actualizarPeso,
    borrarPeso,
} = require('../controllers/usuario-peso');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Rutas de pesos
router.get('/:id/pesos', validarJWT, obtenerPesos);
router.post('/:id/pesos', validarJWT, guardarPeso);
router.put('/:id/pesos', validarJWT, actualizarPeso);
router.delete('/:id/pesos', validarJWT, borrarPeso);

module.exports = router;

