import Novedades from "../model/novedadesModel.js";

export const getNovedades = async (req, res) => {
    try {
       
        const page = parseInt(req.query.page) || 1;  
        const limit = parseInt(req.query.limit) || 10; 

        // Usar el método `paginate` de Mongoose
        const novedades = await Novedades.paginate({}, { page, limit });

        res.json({
            totalDocs: novedades.totalDocs,
            totalPages: novedades.totalPages,
            currentPage: novedades.page,
            docs: novedades.docs,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las novedades', error });
    }
};



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

//Buscar por categoria: infraestructura, actualizacion de software, servicio
export const buscarByCategoria = async (req, res) => {
    try {
        const categoria = req.query.categoria; 
        const novedades = await Novedades.find({ categoria: categoria }); 
        res.status(200).json(novedades); 
    } catch (error) {
        res.status(400).json({ error: error.message });
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
