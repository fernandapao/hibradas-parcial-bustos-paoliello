import Novedades from "../model/novedadesModel.js";

export const createNovedad = async (req, res) => {
    //validacion
    const {error} = novedadesValidacion(req.body);
    if(error) return res.status(400).json({error:error.details[0].message})
        console.log(error)
    try {
            const novedad = new Novedades({...req.body});
            const guardarNovedades = await novedad.save();
            res.json(guardarNovedades)
    }catch(err){
        res.status(400).json({error:err.message})
    }
};

export const getNovedad = async (req, res) => {
    try {
        const novedad = await Novedades.find();
        res.json(novedad)
            
    }catch(err){
        res.status(400).json({error:err.message})
    }
};

export const getNovedadById = async (req, res) => {
    try {
        const id = req.params.id.trim();
        const novedad = await Novedades.findById(req.params.id);
        if(!novedad) return res.status(400).json({error: "no disponible"})
        res.json(novedad)
            
            
    }catch(err){
        res.status(400).json({error:err.message})
    }
};

export const updateNovedad = async (req, res) => {
    try {
        const actualizarNovedad = await Novedades.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(actualizarNovedad)
            
    }catch(err){
        res.status(400).json({error:err.message})
    }
};

export const deleteNovedad = async (req, res) => {
    try {
        const eliminarNovedad = await Funciones.findByIdAndDelete(req.params.id, req.body)
        res.json(eliminarNovedad)
            
    }catch(err){
        res.status(400).json({error:err.message})
    }
};

export const buscarByCategoria = async (req, res) => {
    try {
            const buscarCategoria = req.query.buscarCategoria.split(',')
            const novedades = await Novedades.find({categoria:{$in:buscarCategoria}});
            res.json(novedades)
    }catch(err){
        res.status(400).json({error:err.message})
    }
};

export const buscarByNombre = async (req, res) => {
    try {
            const buscarNombre = req.query.buscarNombre.split(',')
            const novedades = await Novedades.find({nombre:{$in:buscarNombre}});
            res.json(novedades)
    }catch(err){
        res.status(400).json({error:err.message})
    }
};





//Paginado

export const getOrdenar = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Página actual (por defecto 1)
        const limit = parseInt(req.query.limit) || 10; // Número de resultados por página (por defecto 10)
        const skip = (page - 1) * limit; // Cálculo para saltar los resultados

        // Ordenamiento
        const sortField = req.query.sortField || 'fecha'; // Campo por el que se ordenará (por defecto 'fecha')
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1; // Orden (ascendente o descendente)

        // Obtener las novedades con paginado y ordenamiento
        const novedades = await Novedades.find()
            .sort({ [sortField]: sortOrder }) // Ordenar por el campo y el orden especificado
            .skip(skip) // Saltar los primeros 'skip' resultados
            .limit(limit); // Limitar el número de resultados

        const total = await Novedades.countDocuments(); // Total de documentos

        res.status(200).json({
            total,
            page,
            limit,
            novedades
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las novedades' });
    }
};
