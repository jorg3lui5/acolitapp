import { Persona } from './persona';
import { Trabajo } from './trabajo';

export class Empresa {
    id: number;
    nombre: String;
    trabajoList: Trabajo[];
}