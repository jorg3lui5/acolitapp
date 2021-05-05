import { Persona } from './persona';
import { Ciudad } from './ciudad';
import { Nacionalidad } from './nacionalidad';

export class Pais {
    id: string;
    nombre: string;
    nacionalidadList: Nacionalidad[];
    ciudadList: Ciudad[];
    
}