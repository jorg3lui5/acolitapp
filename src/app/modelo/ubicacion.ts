import { Persona } from './persona';
import { Direccion } from './direccion';

export class Ubicacion {
    id: number;
    latitud: number;
    longitud: number;
    direccionList: Direccion[];
    
}