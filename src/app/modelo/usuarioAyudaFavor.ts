import { Persona } from './persona';
import { Favor } from './favor';
import { Usuario } from './usuario';

export class UsuarioAyudaFavor {
    id: string;
    estadoAceptacion: string;
    favor: Favor;
    usuario: Usuario;

}