import { Persona } from './persona';
import { Direccion } from './direccion';
import { Empresa } from './empresa';
import { Ocupacion } from './ocupacion';

export class Trabajo {
    id: number;
    cargo: string;
    direccion: Direccion;
    empresa: Empresa;
    ocupacion: Ocupacion;
    persona: Persona;
    
}