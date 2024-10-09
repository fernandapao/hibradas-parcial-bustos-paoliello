import { leerArchivoNovedades, escribirArchivoNovedades } from "../model/novedadesModel.js";

const getTodasNovedades = (req, res) => {
    let novedades = leerArchivoNovedades();
    res.status(200).json(novedades);
}


const getTodasNovedadesId = (req, res) => {
    const novedadId = parseInt(req.params.id);
    let novedades = leerArchivoNovedades();
    const novedad = novedades.find(a => a.id === novedadId);

    if(novedad) {
        res.status(200).json(novedad);
    } else {
        res.status(404).json({message: "Novedad no encontrada"});
    }
}


const crearNovedad = (req, res) => {
    let novedades = leerArchivoNovedades();
    const nuevaNovedad = {
        id: novedades.length > 0 ? novedades.length + 1 : 1,
        autor: req.body.autor,
        titulo: req.body.titulo,
        novedad: req.body.novedad
    }
   novedades.push(nuevaNovedad);
   escribirArchivoNovedades(novedades);
   res.status(201).json(nuevaNovedad);
}


const actualizarNovedad = (req, res) => {
    const novedadId = parseInt(req.params.id);
    let novedades = leerArchivoNovedades();
    const novedadIndex = novedades.findIndex(a => a.id === novedadId);

    if(novedadIndex !== -1) {
        novedades[novedadIndex] = {id: novedadId, ...req.body};
        escribirArchivoNovedades(novedades);
        res.status(200).json(novedades[novedadIndex])
    } else {
        res.status(404).json({message: "Novedad no encontrada"});
    }
}


const eliminarNovedad = (req, res) => {
    const novedadId = parseInt(req.params.id);
    let novedades = leerArchivoNovedades();
    const novedadIndex = novedades.findIndex(a => a.id === novedadId);

    if(novedadIndex !== -1) {
        novedades.splice(novedadIndex, 1)
        escribirArchivoNovedades(novedades);
        res.status(204).send();
    } else {
        res.status(404).json({message: "Novedad no encontrada"});
    }
}


export {getTodasNovedades, getTodasNovedadesId, crearNovedad, actualizarNovedad, eliminarNovedad}