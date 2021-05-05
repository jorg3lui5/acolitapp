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
    id: string;
    identificacion: string;
    nombresApellidos: string;
    telefono: string;
    licencia: string;
    informacionAdicional: string;
    usuario: string;
    filtroPersonaList: FiltroPersona[];
    nacionalidad: string;
    nivelEstudios: string;
    ocupacion: string;
    profesion: string;
    tipoLicencia: string;
    pais: string;
    ciudad: string;
    direccion: string;
    tipoVehiculo: string;
    placaVehiculo: string;
    usuarioList: Usuario[];
}