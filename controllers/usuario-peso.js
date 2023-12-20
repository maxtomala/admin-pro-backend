// usuario-peso.controller.js

const { response } = require('express');
const UsuarioPeso = require('../models/usuario-peso');
const Usuario = require('../models/usuario');

// Obtener todos los pesos de un usuario
const obtenerPesos = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id',
            });
        }

        const pesos = await UsuarioPeso.find({ usuario: uid });
        res.json({
            ok: true,
            pesos,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: `Error interno del servidor: ${error.message || error}`,
        });
    }
};

// Guardar peso de un usuario
const guardarPeso = async (req, res) => {
    const uid = req.params.id;
    const { fecha, hora, valor } = req.body;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id',
            });
        }

        const nuevoPeso = new UsuarioPeso({
            usuario: uid,
            fecha,
            hora,
            valor,
        });

        await nuevoPeso.save();

        res.json({
            ok: true,
            msg: 'Peso guardado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: `Error interno del servidor: ${error.message || error}`,
        });
    }
};

// Actualizar peso de un usuario
const actualizarPeso = async (req, res) => {
    const uid = req.params.id;
    const { fecha, hora, valor } = req.body;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id',
            });
        }

        const pesoActualizado = await UsuarioPeso.findOneAndUpdate(
            { usuario: uid, fecha, hora },
            { valor },
            { new: true }
        );

        res.json({
            ok: true,
            msg: 'Peso actualizado correctamente',
            peso: pesoActualizado,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: `Error interno del servidor: ${error.message || error}`,
        });
    }
};

// Borrar peso de un usuario
const borrarPeso = async (req, res) => {
    const uid = req.params.id;
    const fecha = req.query.fecha;
    const hora = req.query.hora;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id',
            });
        }

        await UsuarioPeso.findOneAndDelete({ usuario: uid, fecha, hora });

        res.json({
            ok: true,
            msg: 'Peso eliminado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: `Error interno del servidor: ${error.message || error}`,
        });
    }
};

module.exports = {
    obtenerPesos,
    guardarPeso,
    actualizarPeso,
    borrarPeso,
};
