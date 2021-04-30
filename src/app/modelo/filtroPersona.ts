import { Persona } from './persona';
import { Filtro } from './filtro';

export class FiltroPersona {
    id: number;
    valorString: string;
    valorInt: number;
    tabla: number;
    estado: string;
    filtro: Filtro;
    persona: Persona;
}