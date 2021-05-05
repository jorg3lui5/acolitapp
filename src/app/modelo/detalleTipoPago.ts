import { Persona } from './persona';
import { Favor } from './favor';
import { TipoPago } from './tipoPago';

export class DetalleTipoPago {
    id: string;
    descripcion: string;
    favorList: Favor[];
    tipoPago: TipoPago;
    valor: number;
}