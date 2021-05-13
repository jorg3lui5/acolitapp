import { Persona } from './persona';
import { Calificacion } from './calificacion';
import { FiltroFavor } from './filtroFavor';
import { UsuarioAyudaFavor } from './usuarioAyudaFavor';
import { DetalleTipoPago } from './detalleTipoPago';
import { Direccion } from './direccion';
import { Usuario } from './usuario';

export class Favor {
    id: string;
    titulo: string;
    descripcion: string;
    estado: string;
    fechaSolicita: number;
    fechaRealiza: number;
    calificacionSolicita: number;
    calificacionRealiza: number;
    filtroFavorList: FiltroFavor[];
    usuarioAyudaFavorList: UsuarioAyudaFavor[];
    tipoPago: string;
    descripcionPago: string;
    valorPago: number;
    direccionFavor: Direccion;
    usuarioRealiza: string;
    usuarioSolicita: string;
    
}