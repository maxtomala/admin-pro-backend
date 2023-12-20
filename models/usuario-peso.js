// usuario-peso.js

const { Schema, model } = require('mongoose');

const UsuarioPesoSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    valor: {
        type: Number,
        required: true,
    },
});

// Método toJSON para personalizar la serialización a JSON
UsuarioPesoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('UsuarioPeso', UsuarioPesoSchema);
