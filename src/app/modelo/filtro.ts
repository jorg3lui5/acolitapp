import { Persona } from './persona';
import { CategoriaFiltro } from './categoriaFiltro';
import { FiltroFavor } from './filtroFavor';
import { FiltroConfiguracionUsuario } from './filtroConfiguracionUsuario';
import { FiltroPersona } from './filtroPersona';

export class Filtro {
    id: number;
    nombre: string;
    descripcion: string;
    categoriaFiltro: CategoriaFiltro;
    filtroFavorList: FiltroFavor[];
    filtroConfiguracionUsuarioList: FiltroConfiguracionUsuario[];
    filtroPersonaList: FiltroPersona[];    
}