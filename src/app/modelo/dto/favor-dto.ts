import { Direccion } from "../direccion";
import { FiltroFavor } from "../filtroFavor";
import { UsuarioAyudaFavor } from "../usuarioAyudaFavor";
import { UsuarioDTO } from "./usuario-dto";
import { Usuario } from '../usuario';

export class FavorDTO {

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
    usuarioRealiza: Usuario;
    usuarioSolicita: Usuario;
}