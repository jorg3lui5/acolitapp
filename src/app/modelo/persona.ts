import { Usuario } from './usuario';
import { Trabajo } from './trabajo';
import { FiltroPersona } from './filtroPersona';
import { Nacionalidad } from './nacionalidad';
import { NivelEstudios } from './nivelEstudios';
import { Ocupacion } from './ocupacion';
import { Profesion } from './profesion';
import { Direccion } from './direccion';
import { TipoLicencia } from './tipoLicencia';
import { VehiculoPersona } from './vehiculoPersona';

export class Persona {
    id: number;
    identificacion: string;
    nombresApellidos: string;
    telefono: string;
    licencia: string;
    informacionAdicional: string;
    usuario: Usuario;
    trabajoList: Trabajo[];
    filtroPersonaList: FiltroPersona[];
    nacionalidad: Nacionalidad;
    nivelEstudios: NivelEstudios;
    ocupacion: Ocupacion;
    profesion: Profesion;
    tipoLicencia: TipoLicencia;
    direccionList: Direccion[];
    vehiculoPersonaList: VehiculoPersona[];
    usuarioList: Usuario[];
}