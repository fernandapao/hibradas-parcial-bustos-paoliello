import fs from "fs"
import path from "path"
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url);
const archivoUsuariosPath = path.join(path.dirname(__fileName), '../data/users.json');


const leerArchivoUsuarios = () => {
    const data = fs.readFileSync(archivoUsuariosPath, 'utf8');
    return JSON.parse(data);
}

const escribirArchivoUsuarios = (data) => {
    fs.writeFileSync(archivoUsuariosPath, JSON.stringify(data), 'utf8')
}

export {leerArchivoUsuarios, escribirArchivoUsuarios};

