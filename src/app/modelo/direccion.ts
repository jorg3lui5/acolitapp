import { Persona } from './persona';
import { Trabajo } from './trabajo';
import { Ciudad } from './ciudad';
import { Ubicacion } from './ubicacion';
import { Favor } from './favor';

export class Direccion {
    id: string;
    callePrincipal: string;
    calleSecundaria: string;
    barrio: string;
    numeroCasa: string;
    referencia: string;
    trabajoList: Trabajo[];
    ciudad: Ciudad;
    persona: Persona;
    ubicacion: Ubicacion;
    favorList: Favor[];

}