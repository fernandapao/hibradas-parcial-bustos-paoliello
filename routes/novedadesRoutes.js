import express from "express"
import {getTodasNovedades, getTodasNovedadesId, crearNovedad, actualizarNovedad, eliminarNovedad} from "../controllers/novedadesController.js";

const router = express.Router();


// Todas las novedades
router.get('/', getTodasNovedades);

// Novedades por id
router.get('/:id', getTodasNovedadesId);

// Crear novedad
router.post('/', crearNovedad);

// Actualizar una Novedad
router.put('/:id', actualizarNovedad);

// Eliminar una novedad
router.delete('/:id', eliminarNovedad);

export default router;