import express from "express"
import { getTodosUsuarios, getTodosUsuariosId, crearUsuario, loginUsuario, actualizarUsuario, eliminarUsuario } from "../controllers/usersController.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";


dotenv.config();

const claveSecreta = process.env.SECRET;
const router = express.Router();


const autenticacion = (req, res, next) => {
    const getToken = req.headers.authorization;

    if (getToken) {
        const token = getToken.split(" ")[1];
        jwt.verify(token, claveSecreta, (err, paylod) => {
            if (err) {
                return res.status(403).send("Acceso denegado")
            }
            // console.log(playlod);
            req.user = {id: paylod.id, email: paylod.email}
            next();
        })
    }
}


router.get('/', autenticacion, getTodosUsuarios)

router.get('/:id', getTodosUsuariosId)

router.post('/', crearUsuario)

router.post('/login', loginUsuario)

router.put('/:id', actualizarUsuario)

router.delete('/:id', eliminarUsuario)

export default router;