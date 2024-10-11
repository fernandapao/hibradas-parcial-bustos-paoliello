import Joi from "joi";

export const funcionesValidacion = (data) => {
    const schema = Joi.object({
        funcion: Joi.string().min(5).max(255).required(),
    descripcion: Joi.string().min(5).max(400).required()

    });

    return schema.validate(data)
}

export const novedadesValidacion = (data) => {
    const schema = Joi.object({
        descripcion: Joi.string().min(5).max(255).required(),
        categoria: Joi.string().min(5).max(400).required(),
        fecha: Joi.date().min(5).max(400).required()

    });

    return schema.validate(data)
}

export const UsersValidacion = (data) => {
    const schema = Joi.object({
        nombre: Joi.string().min(3).max(50).required(),
        apellido: Joi.string().min(3).max(50).required(),
        usuario: Joi.string().min(5).max(100).required(),
        email: Joi.string().min(5).max(100).required()

    });

    return schema.validate(data)
}