import { Persona } from './persona';
import { Direccion } from './direccion';

export class Ubicacion {
    id: string;
    latitud: number;
    longitud: number;
    direccionList: Direccion[];
    
}