

import mongoose from "mongoose";

const funcionesSchema = new mongoose.Schema({
    funcion: {type: String, required: true},
    descripcion: {type: String, required: true}

})

export default mongoose.model('funciones', funcionesSchema)



