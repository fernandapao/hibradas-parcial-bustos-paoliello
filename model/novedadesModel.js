
import mongoose from "mongoose";

const novedadesSchema = new mongoose.Schema({
        nombre: {type: String, required: true},
        descripcion: {type: String, required: true},
        categoria: {type: String, required: true},
        fecha:{type: Date, required: true}

})

export default mongoose.model('novedades', novedadesSchema);


