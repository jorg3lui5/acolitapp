import { Persona } from './persona';
import { Calificacion } from './calificacion';
import { FiltroFavor } from './filtroFavor';
import { UsuarioAyudaFavor } from './usuarioAyudaFavor';
import { DetalleTipoPago } from './detalleTipoPago';
import { Direccion } from './direccion';
import { Usuario } from './usuario';

export class Favor {
    id: number;
    titulo: string;
    descripcion: string;
    estado: String;
    fechaSolicita: Date;
    fechaRealiza: Date;
    calificacionList: Calificacion[];
    filtroFavorList: FiltroFavor[];
    usuarioAyudaFavorList: UsuarioAyudaFavor[];
    detalleTipoPago: DetalleTipoPago;
    direccionFavor: Direccion;
    usuarioRealiza: Usuario;
    usuarioSolicita: Usuario;
    
}