const mongoose = require('mongoose');
const dotenv = require('dotenv'); // Importa dotenv

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const connectDB = async () => {
    try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);

    } catch (error) {
    console.log(error);
    process.exit(1);
    }
};

module.exports = connectDB;
