// Rutas: /api/usuarios

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { getUsuarios, CrearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT, validarADMIN_ROLE,validarADMIN_ROLE_oMismoUsuario } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/', 
validarJWT, 
getUsuarios);

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
        validarADMIN_ROLE_oMismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario
);

router.delete('/:id',
   [ validarJWT,
    validarADMIN_ROLE
    // [
    //     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    //     check('email', 'El correo es obligatorio').isEmail(),
    //     check('role', 'El rol es obligatorio').isEmail(),
    //     validarCampos,
    ],
    borrarUsuario
);

module.exports = router;