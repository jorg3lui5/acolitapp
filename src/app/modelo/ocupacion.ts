import { Persona } from './persona';
import { Trabajo } from './trabajo';

export class Ocupacion {
    id: string;
    nombre: string;
    trabajoList: Trabajo[];
    personaList: Persona[];

    
}