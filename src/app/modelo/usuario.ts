import { Persona } from './persona';
import { Calificacion } from './calificacion';
import { FiltroConfiguracionUsuario } from './filtroConfiguracionUsuario';
import { Favor } from './favor';
import { UsuarioAyudaFavor } from './usuarioAyudaFavor';

export class Usuario {
    id: string;
    usuario: string;
    correo: string;
    contrasenia: string;
    foto: any;
    calificacion: number;
    estado: number;
    filtroConfiguracionUsuarioList: FiltroConfiguracionUsuario[];
    usuarioAyudaFavorList: UsuarioAyudaFavor[];
    favorList: Favor[];
    favorList1: Favor[];
    persona: Persona;
    token: string;
    
}