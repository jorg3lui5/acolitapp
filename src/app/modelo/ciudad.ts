import { Persona } from './persona';
import { Direccion } from './direccion';
import { Pais } from './pais';

export class Ciudad {
    id: string;
    nombre: string;
    direccionList: Direccion[];
    pais: Pais;
    
}