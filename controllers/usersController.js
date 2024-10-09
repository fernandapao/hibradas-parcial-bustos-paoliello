import { leerArchivoUsuarios, escribirArchivoUsuarios } from "../model/usersModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";


dotenv.config();

const claveSecreta = process.env.SECRET;


const getTodosUsuarios = (req, res) => {
    let usuarios = leerArchivoUsuarios();
    res.status(200).json(usuarios);
}


const getTodosUsuariosId = (req, res) => {
    const usuarioId = parseInt(req.params.id);
    let usuarios = leerArchivoUsuarios();
    const usuario = usuarios.find(a => a.id === usuarioId);

    if (usuario) {
        res.status(200).json(usuario);
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
}


const crearUsuario = async (req, res) => {
    const { nombre, apellido, usuario, contrasenia, email } = req.body;

    const contraseniaCifrada = await bcrypt.hash(contrasenia, 10)

    let usuarios = leerArchivoUsuarios();
    const nuevoUsuario = {
        id: usuarios.length > 0 ? usuarios.length + 1 : 1,
        nombre,
        apellido,
        usuario,
        email,
        contrasenia: contraseniaCifrada //no es información que se suela mostrar
    }
    usuarios.push(nuevoUsuario);
    escribirArchivoUsuarios(usuarios);
    res.status(201).json(nuevoUsuario);
}


const loginUsuario = async (req, res) => {
    const {email, contrasenia} = req.body;
 
    let usuarios = leerArchivoUsuarios();
 
    const usuario = usuarios.find(u => u.email === email);
     console.log(usuario)
    if(!usuario){
     return res.status(404).json({message: "Usuario no encontrado"})
    }
 
    const validarContrasenia = await bcrypt.compare(contrasenia, usuario.contrasenia);
    if(!validarContrasenia){
     return res.status(401).json({message: "Contraseña incorrecta"})
    }
 
    const token = jwt.sign({id: usuario.id, email: usuario.email}, claveSecreta, {expiresIn: '1h'});
 
    res.status(200).json({token});
 }



const actualizarUsuario = (req, res) => {
    const usuarioId = parseInt(req.params.id);
    let usuarios = leerArchivoUsuarios();
    const usuarioIndex = usuarios.findIndex(a => a.id === usuarioId);

    if (libroIndex !== -1) {
        usuarios[usuarioIndex] = { id: usuarioId, ...req.body };
        escribirArchivoUsuarios(usuarios);
        res.status(200).json(usuarios[usuarioIndex])
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
}


const eliminarUsuario = (req, res) => {
    const usuarioId = parseInt(req.params.id);
    let usuarios = leerArchivoUsuarios();
    const usuarioIndex = usuarios.findIndex(a => a.id === usuarioId);

    if (usuarioIndex !== -1) {
        usuarios.splice(usuarioIndex, 1)
        escribirArchivoUsuarios(usuarios);
        res.status(204).send();
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
}


export { getTodosUsuarios, getTodosUsuariosId, crearUsuario, loginUsuario, actualizarUsuario, eliminarUsuario }