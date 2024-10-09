import express from "express"
import {getTodasFunciones, getTodasFuncionesId, crearFuncion, actualizarFuncion, eliminarFuncion} from "../controllers/funcionesController.js";

const router = express.Router();


// Todas las funciones
router.get('/', getTodasFunciones);

// funciones por id
router.get('/:id', getTodasFuncionesId);

// Crear funcion
router.post('/', crearFuncion);

// Actualizar una funcion
router.put('/:id', actualizarFuncion);

// Eliminar una funcion
router.delete('/:id', eliminarFuncion);

export default router;