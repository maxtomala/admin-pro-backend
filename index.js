require('dotenv').config();

 const express = require('express');
 const cors = require('cors')

 const { dbConnection } = require ('./database/config');

 // crear el servidor de express
 const app= express();

 // conf. cors
 app.use(cors())

 //base de datos
 dbConnection();

 console.log(process.env);
//mean_user
//kdGP8bIsojH0bxzK

//rutas
app.get('/', (req,res)=>{
   res.json({
      ok:true,
      msg:'Hola mundo'
   })

});

 app.listen( process.env.PORT, () =>{
    console.log('servidor corriendo en puerto ' + process.env.PORT);
 });



// const express = require('express');
// require('dotenv').config();
// const { dbConnection } = require('./database/config');

// const app = express();
// const PORT = 3000;

// // Middleware para parsear JSON
// app.use(express.json());

// // Conectar a la base de datos al iniciar el servidor
// dbConnection()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Servidor corriendo en el puerto ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Error al conectar a la base de datos:', error);
//   });

// // Ruta de ejemplo
// app.get('/', (req, res) => {
//   res.json({
//     ok: true,
//     msg: 'Hola mundo'
//   });
// });

// // Manejar errores 404
// app.use((req, res) => {
//   res.status(404).json({
//     error: 'Ruta no encontrada'
//   });
// });

// // Manejar errores generales
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({
//     error: 'Error interno del servidor'
//   });
// });









