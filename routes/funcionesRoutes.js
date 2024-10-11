 import express from "express";
 import {createFuncion, deleteFuncion, getFuncion, getFuncionById, updateFuncion} from "../controllers/funcionesController.js"

 const router = express.Router();

 router.post('/', createFuncion);

 router.get('/', getFuncion);

 router.get('/:id', getFuncionById);

 router.put('/:id', updateFuncion);

 router.put('/:id', deleteFuncion);
 

 export default router;