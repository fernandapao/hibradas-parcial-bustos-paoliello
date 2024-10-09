import fs from "fs"
import path from "path"
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url);
const archivoNovedadesPath = path.join(path.dirname(__fileName), '../data/novedades.json');


const leerArchivoNovedades = () => {
    const data = fs.readFileSync(archivoNovedadesPath, 'utf-8');
    return JSON.parse(data);
}


const escribirArchivoNovedades = (data) => {
    fs.writeFileSync(archivoNovedadesPath, JSON.stringify(data), 'utf-8');
}

export{leerArchivoNovedades, escribirArchivoNovedades};

