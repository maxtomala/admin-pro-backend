// Rutas: /api/usuarios

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { getUsuarios, CrearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/', validarJWT, getUsuarios);

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        validarCampos,

    ],
    CrearUsuario);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario
);

router.delete('/:id',
    validarJWT,
    // [
    //     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    //     check('email', 'El correo es obligatorio').isEmail(),
    //     check('role', 'El rol es obligatorio').isEmail(),
    //     validarCampos,
    // ],
    borrarUsuario
);



module.exports = router;