const path = require('path');
const fs = require('fs');


const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');



const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    console.log(tipo);

    //validar tipo
    const tipoValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tipoValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es médico, usuario u hospital (tipo)'
        });
    }
    //validar que exista un archivo 

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }


    // procesar la imagen... id unico a la imagen,meterla en al carpeta respectiva, moverla, extension, nombre
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');//wolverine.1.3.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //validar extension 
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }
    // generar el nombre del archhivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
    console.log(nombreArchivo);
    // path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'error al mover la imagen'
            })
        } else {

            //actualizar la bd
            actualizarImagen( tipo, id, nombreArchivo);

            res.status(200).json({
                ok: true,
                msg: 'Archivo subido',
                nombreArchivo
            });
        }
    })
}

const retornaImagen = ( req, res = response ) => {
    

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );


    //imagen por defecto
    if ( fs.existsSync( pathImg ) ) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.png` );
        res.sendFile( pathImg );
    }

}


module.exports = {
    fileUpload,
    retornaImagen
}





