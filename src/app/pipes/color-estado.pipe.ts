import { Pipe, PipeTransform } from '@angular/core';
import { PaisEnum } from '../modelo/enum/pais-enum';
import { EstadofavorEnum } from '../modelo/enum/estado-favor-enum';
import { avanceFavorDTO } from '../modelo/dto/avance-favor-dto';

@Pipe({
  name: 'colorEstadoPipe'
})
export class ColorEstadoPipe implements PipeTransform {

  transform(estado: string): string {
    switch(estado) { 
      case EstadofavorEnum.solicitado: { 
         return 'medium';
      } 
      case EstadofavorEnum.pendiente: { 
        return 'danger';
      } 
      case EstadofavorEnum.realizando: { 
        return 'warning';
      } 
      case EstadofavorEnum.finalizado: { 
        return 'success';
      } 
      case EstadofavorEnum.calificado: { 
        return 'success';
      }
   } 
  }

}
