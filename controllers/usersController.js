import User from "../model/usersModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const claveSecreta = process.env.SECRET;

// Obtener todos los usuarios
const getTodosUsuarios = async (req, res) => {
    try {
        const usuarios = await User.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios", error });
    }
};

// Obtener un usuario por ID
const getTodosUsuariosId = async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario", error });
    }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
    try {
        const { nombre, apellido, usuario, contrasenia, email } = req.body;

        // Cifrar la contraseña antes de guardar
        const contraseniaCifrada = await bcrypt.hash(contrasenia, 10);

        // Crear el nuevo usuario en la base de datos
        const nuevoUsuario = new User({
            nombre,
            apellido,
            usuario,
            email,
            contrasenia: contraseniaCifrada
        });

        await nuevoUsuario.save();

        res.status(201).json({ message: "Usuario creado exitosamente", nuevoUsuario });
    } catch (error) {
        res.status(500).json({ message: "Error al crear usuario", error });
    }
};

// Login de usuario
const loginUsuario = async (req, res) => {
    const { email, contrasenia } = req.body;

    try {
        // Buscar usuario por email
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Verificar la contraseña
        const validarContrasenia = await bcrypt.compare(contrasenia, usuario.contrasenia);
        if (!validarContrasenia) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id: usuario._id, email: usuario.email },
            claveSecreta,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error en el inicio de sesión", error });
    }
};

// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuarioActualizado = await User.findByIdAndUpdate(usuarioId, req.body, { new: true });

        if (usuarioActualizado) {
            res.status(200).json(usuarioActualizado);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error });
    }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuarioEliminado = await User.findByIdAndDelete(usuarioId);

        if (usuarioEliminado) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario", error });
    }
};

export { getTodosUsuarios, getTodosUsuariosId, crearUsuario, loginUsuario, actualizarUsuario, eliminarUsuario };
