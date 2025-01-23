const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            //newParser está obseleto. O mongoose já faz isso por padrão
        });
        console.log("Conectado ao MongoDB!");
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB", error);
        process.exit(1);
    }
};

module.exports = connectDB;
