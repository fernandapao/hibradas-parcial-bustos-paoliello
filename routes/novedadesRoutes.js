import express from "express";
import {getNovedades, buscarByCategoria, createNovedad, deleteNovedad, getNovedad, getNovedadById, updateNovedad, buscarByNombre} from "../controllers/novedadesController.js";

 

 const router = express.Router();

 router.post('/', createNovedad);

 router.get('/', getNovedad);
 
 router.get('/paginas', getNovedades);

 router.get('/:id', getNovedadById);

 router.get('/buscar/nombre', buscarByNombre);

 router.get('/buscar/categoria', buscarByCategoria);

 router.put('/:id', updateNovedad);

 router.delete('/:id', deleteNovedad);


 export default router;
