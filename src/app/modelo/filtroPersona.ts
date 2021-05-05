import { Persona } from './persona';
import { Filtro } from './filtro';

export class FiltroPersona {
    id: string;
    valorString: string;
    valorInt: number;
    tabla: number;
    estado: string;
    filtro: Filtro;
    persona: Persona;
}