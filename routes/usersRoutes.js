import express from "express";
import {
    getTodosUsuarios,
    getTodosUsuariosId,
    crearUsuario,
    loginUsuario,
    actualizarUsuario,
    eliminarUsuario
} from "../controllers/usersController.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const claveSecreta = process.env.SECRET;
const router = express.Router();

// Middleware de autenticación
const autenticacion = (req, res, next) => {
    const getToken = req.headers.authorization;

    if (getToken) {
        const token = getToken.split(" ")[1];
        jwt.verify(token, claveSecreta, (err, payload) => {
            if (err) {
                return res.status(403).json({ message: "Acceso denegado" });
            }
            req.user = { id: payload.id, email: payload.email };
            next();
        });
    } else {
        res.status(403).json({ message: "Token no proporcionado" });
    }
};

// Rutas de usuarios
router.get('/', autenticacion, getTodosUsuarios);
router.get('/:id', autenticacion, getTodosUsuariosId);
router.post('/', crearUsuario);
router.post('/login', loginUsuario);
router.put('/:id', autenticacion, actualizarUsuario);
router.delete('/:id', autenticacion, eliminarUsuario);

export default router;
