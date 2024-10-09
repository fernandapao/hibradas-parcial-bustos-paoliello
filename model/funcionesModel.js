import fs from "fs"
import path from "path"
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url);
const archivoFuncionesPath = path.join(path.dirname(__fileName), '../data/funciones.json');


const leerArchivoFunciones = () => {
    const data = fs.readFileSync(archivoFuncionesPath, 'utf-8');
    return JSON.parse(data);
}


const escribirArchivoFunciones = (data) => {
    fs.writeFileSync(archivoFuncionesPath, JSON.stringify(data), 'utf-8');
}

export{leerArchivoFunciones, escribirArchivoFunciones};

