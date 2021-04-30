import { Persona } from './persona';
import { Trabajo } from './trabajo';

export class Ocupacion {
    id: number;
    nombre: string;
    trabajoList: Trabajo[];
    personaList: Persona[];

    
}