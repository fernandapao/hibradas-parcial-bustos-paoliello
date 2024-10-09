import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import novedadesRoutes from './routes/novedadesRoutes.js'; 
import funcionesRoutes from './routes/funcionesRoutes.js';
import usersRoutes from './routes/usersRoutes.js';

import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
const port = 3000;

const __fileName = fileURLToPath(import.meta.url);
app.use(express.json());
app.use(express.static(path.join(path.dirname(__fileName), 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(path.dirname(__fileName), 'public', 'index.html'));
})

app.use('/novedades', novedadesRoutes);
app.use('/funciones', funcionesRoutes); 


function verificarRol(rolesAdmitidos) {
    return function(req, res, next){
        const rolUsuario =req.headers['x-rol'];

        if(rolesAdmitidos.includes(rolUsuario)){
            next();
        } else {
            res.status(403).json({mesaje: "Acceso denegado"})
        }
    }
}

app.get("/panel", verificarRol(["admin", "super-admin"]), (req, res) =>{
    res.send("Acceso permitido")
});


app.use('/usuarios', usersRoutes);


app.listen(port, () => console.log(`http://localhost:${port}`));

dotenv.config();

const mongoURI = process.env.MONGO_URI; // Debes definir MONGO_URI en tu archivo .env con la cadena de conexión

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error conectando a MongoDB:', err));