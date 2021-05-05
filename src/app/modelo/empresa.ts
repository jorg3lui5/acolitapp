import { Persona } from './persona';
import { Trabajo } from './trabajo';

export class Empresa {
    id: string;
    nombre: String;
    trabajoList: Trabajo[];
}