import { Persona } from './persona';
import { Direccion } from './direccion';
import { Pais } from './pais';

export class Ciudad {
    id: number;
    nombre: string;
    direccionList: Direccion[];
    pais: Pais;
    
}