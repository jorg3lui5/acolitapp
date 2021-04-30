import { Persona } from './persona';
import { TipoVehiculo } from './tipoVehiculo';
import { VehiculoPersona } from './vehiculoPersona';

export class Vehiculo {
    id: number;
    nombre: string;
    placa: string;
    tipoVehiculo: TipoVehiculo;
    vehiculoPersonaList: VehiculoPersona[];
}