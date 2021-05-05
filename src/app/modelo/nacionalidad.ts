import { Persona } from './persona';
import { Profesion } from './profesion';

export class Nacionalidad {
    id: string;
    nombre: string;
    personaList: Persona[];
    profesionList: Profesion[];
    
}