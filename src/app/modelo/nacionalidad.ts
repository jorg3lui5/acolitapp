import { Persona } from './persona';
import { Profesion } from './profesion';

export class Nacionalidad {
    id: number;
    nombre: string;
    personaList: Persona[];
    profesionList: Profesion[];
    
}