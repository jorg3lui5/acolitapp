import { Favor } from "../favor";
import { FiltroConfiguracionUsuario } from "../filtroConfiguracionUsuario";
import { Persona } from "../persona";
import { UsuarioAyudaFavor } from "../usuarioAyudaFavor";

export class UsuarioDTO {
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