import { Persona } from './persona';
import { Filtro } from './filtro';
import { TipoConfiguracion } from './tipoConfiguracion';
import { Usuario } from './usuario';

export class FiltroConfiguracionUsuario {
    id: number;
    valorString: string;
    valorInt: number;
    tabla: number;
    estado: string;
    filtro: Filtro;
    tipoConfiguracion:TipoConfiguracion;
    usuario: Usuario;
    
}