import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import novedadesRoutes from './routes/novedadesRoutes.js'; 
import funcionesRoutes from './routes/funcionesRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("La conexion fue exitosa con mongodb."))
.catch((error) => console.error("Error al conectar con mongodb.", error))

const __fileName = fileURLToPath(import.meta.url);
app.use(express.json());
app.use(express.static(path.join(path.dirname(__fileName), 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(path.dirname(__fileName), 'public', 'index.html'));
})

app.get("/documentacion", (req, res) => {
    res.sendFile(path.join(path.dirname(__fileName), 'public', 'documentacion.html'));
})

app.use('/novedades', novedadesRoutes);
app.use('/funciones', funcionesRoutes); 
app.use('/usuarios', usersRoutes);

function verificarRol(rolesAdmitidos) {
    return function(req, res, next){
        const rolUsuario =req.headers['x-rol'];

        if(rolesAdmitidos.includes(rolUsuario)){
            next();
        } else {
            res.status(403).json({mensaje: "Acceso denegado"})
        }
    }
}

app.get("/panel", verificarRol(["admin", "super-admin"]), (req, res) =>{
    res.send("Acceso permitido")
});





app.listen(port, () => console.log(`http://localhost:${port}`));