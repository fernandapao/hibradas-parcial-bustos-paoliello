import { leerArchivoFunciones, escribirArchivoFunciones } from "../model/funcionesModel.js";

const getTodasFunciones = (req, res) => {
    let funciones = leerArchivoFunciones();
    res.status(200).json(funciones);
}


const getTodasFuncionesId = (req, res) => {
    const funcionId = parseInt(req.params.id);
    let funciones = leerArchivoFunciones();
    const funcion = funciones.find(a => a.id === funcionId);

    if(funcion) {
        res.status(200).json(novedad);
    } else {
        res.status(404).json({message: "Funcion no encontrada"});
    }
}


const crearFuncion = (req, res) => {
    let funciones = leerArchivoFunciones();
    const nuevaFuncion = {
        id: funciones.length > 0 ? funciones.length + 1 : 1,
        funcion: req.body.funcion,
        descripcion: req.body.descripcion
    }
   funciones.push(nuevaFuncion);
   escribirArchivoFunciones(funciones);
   res.status(201).json(nuevaFuncion);
}


const actualizarFuncion = (req, res) => {
    const funcionId = parseInt(req.params.id);
    let funciones = leerArchivoFunciones();
    const funcionIndex = funciones.findIndex(a => a.id === funcionId);

    if(funcionIndex !== -1) {
        funciones[funcionIndex] = {id: funcionId, ...req.body};
        escribirArchivoFunciones(funciones);
        res.status(200).json(funciones[funcionIndex])
    } else {
        res.status(404).json({message: "Funcion no encontrada"});
    }
}


const eliminarFuncion = (req, res) => {
    const funcionId = parseInt(req.params.id);
    let funciones = leerArchivoFunciones();
    const funcionIndex = funciones.findIndex(a => a.id === funcionId);

    if(funcionIndex !== -1) {
        funciones.splice(funcionIndex, 1)
        escribirArchivoFunciones(funciones);
        res.status(204).send();
    } else {
        res.status(404).json({message: "Funcion no encontrada"});
    }
}


export {getTodasFunciones, getTodasFuncionesId, crearFuncion, actualizarFuncion, eliminarFuncion}