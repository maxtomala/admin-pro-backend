require('dotenv').config();

 const express = require('express');
 const cors = require('cors')

 const { dbConnection } = require ('./database/config');

 // crear el servidor de express
 const app= express();

 // conf. cors
 app.use(cors());

 // Carpeta pública
app.use( express.static('public') );

 //lectura y parseo del body
 app.use(express.json());

 //base de datos
 dbConnection();


//mean_user
//kdGP8bIsojH0bxzK

//Rutas + controlador(require)
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));





 app.listen( process.env.PORT, () =>{
    console.log('servidor corriendo en puerto ' + process.env.PORT);
 });









