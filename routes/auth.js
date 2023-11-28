/*
    path: '/api/login'
*/
const { Router } = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.post('/',
    [
        check('email','El email es obligaotio').isEmail(),
        check('password','El password es obligaotio').not().isEmpty(),
        validarCampos
    ],
    login
)

router.post('/google',
    [
        check('token','El Token de google es obligaotio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
)
router.get( '/renew',
    validarJWT,
    renewToken
)





module.exports = router;
