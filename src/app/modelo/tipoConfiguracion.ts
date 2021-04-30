import { Persona } from './persona';
import { FiltroConfiguracionUsuario } from './filtroConfiguracionUsuario';

export class TipoConfiguracion {
    id: number;
    nombre: string;
    filtroConfiguracionUsuarioList: FiltroConfiguracionUsuario[];
    
}