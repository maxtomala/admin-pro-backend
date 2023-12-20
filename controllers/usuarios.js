const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;;

    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip(desde)
            .limit(5),

        Usuario.countDocuments ()

    ]);

    res.json({
        ok: true,
        usuarios,
        total
        //compartir inf en cada peticion ej: uid:req.uid
    });
}
const CrearUsuario = async (req, res = response) => {

    const { email, password } = req.body;


    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'el correo ya esta registrado '
            });
        }

        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //guardar usuario
        await usuario.save();

        //genera el Token - jwt
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar log'
        });
    }

}

const actualizarUsuario = async (req, res = response) => {
    //Todo: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try {
        //verifica ese usuario por ese id
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        //Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese correo'
                })
            }

        }

        if ( !usuarioDB.google ){
            campos.email = email;
        } else if ( usuarioDB.email !== email ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario de google no pueden cambiar su correo'
            });
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });


        res.json({
            ok: true,
            usuario: usuarioActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }

}

const borrarUsuario = async (req, res = response) => {
    const uid = req.params.id;

    try {
        //verifica ese usuario por ese id
        const usuarioDB = await Usuario.findById(uid);
        //si el usuario no existe manda 404
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }
        //si existe, se borra con un msg, mas bien se desactiva el usuario 
        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    getUsuarios,
    CrearUsuario,
    actualizarUsuario,
    borrarUsuario,

} 