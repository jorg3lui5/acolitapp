import { Persona } from './persona';
import { FiltroConfiguracionUsuario } from './filtroConfiguracionUsuario';

export class TipoConfiguracion {
    id: string;
    nombre: string;
    filtroConfiguracionUsuarioList: FiltroConfiguracionUsuario[];
    
}