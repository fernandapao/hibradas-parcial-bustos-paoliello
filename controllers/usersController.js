import Users from "../model/usersModel.js"

export const createUsers = async (req, res) => {
    //validacion
    const {error} = UsersValidacion(req.body);
    if(error) return res.status(400).json({error:error.details[0].message})
        console.log(error)
    try {
            const users = new Users({...req.body});
            const guardarUsers = await users.save();
            res.json(guardarUsers)
    }catch(error){
        res.status(400).json({error:error.mesagge})
    }
};