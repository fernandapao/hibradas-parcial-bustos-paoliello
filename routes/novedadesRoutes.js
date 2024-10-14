import express from "express";
import {buscarByCategoria, createNovedad, deleteNovedad, getNovedad, getNovedadById, updateNovedad, buscarByNombre} from "../controllers/novedadesController.js";

 

 const router = express.Router();

 router.post('/', createNovedad);

 router.get('/', getNovedad);

 router.get('/:id', getNovedadById);

 router.get('/buscar/nombre', buscarByNombre);

 router.get('/buscar/categoria', buscarByCategoria);

 router.put('/:id', updateNovedad);

 router.delete('/:id', deleteNovedad);

 //router.get('/novedades', getOrdenar);

 export default router;
