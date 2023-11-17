const jwt = require('jsonwebtoken');

//funcion que retorna un promesa, en la cual puede usar el await y esperar  token
const generarJWT = (uid) => {

    return new Promise ((resolve,reject)=>{

        const payload ={
            uid
            //ej:role
        };
    
        jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:'12h'
        },(err,token)=>{
    
            if(err){
                console.log(err);
                reject('No se pudo generar el JWT');
            }else{
                resolve(token);
            }
    
        });
    });

}
module.exports = { 
    generarJWT,
    //en un futuro renovar token
}