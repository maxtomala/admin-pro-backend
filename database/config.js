const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN)
            // 'mongodb+srv://admin:admin@cluster0.g32kubh.mongodb.net/')           
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos. Verifica los registros.');
    }
};


module.exports = {
    dbConnection
};



