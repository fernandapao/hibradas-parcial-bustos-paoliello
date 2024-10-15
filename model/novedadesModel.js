
import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const novedadesSchema = new mongoose.Schema({
        nombre: {type: String, required: true},
        descripcion: {type: String, required: true},
        categoria: {type: String, required: true},
        fecha:{type: Date, required: true}

})


novedadesSchema.plugin(mongoosePaginate);

const Novedad = mongoose.model('novedades', novedadesSchema);
export default Novedad;
