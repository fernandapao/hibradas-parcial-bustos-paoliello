import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    usuario: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contrasenia: { type: String, required: true } // Contraseña cifrada
});

const User = mongoose.model('users', usersSchema);

export default User;



