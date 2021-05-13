import { Pipe, PipeTransform } from '@angular/core';
import { PaisEnum } from '../modelo/enum/pais-enum';

@Pipe({
  name: 'nacionalidadPorPais'
})
export class NacionalidadPorPaisPipe implements PipeTransform {

  transform(pais: string, ...args: unknown[]): string {
    switch(pais) { 
      case PaisEnum.alemania: { 
         return 'Alemán';
      } 
      case PaisEnum.argentina: { 
        return 'Argentino';
      } 
      case PaisEnum.brasil: { 
        return 'Brasileño';
      } 
      case PaisEnum.colombia: { 
        return 'Colombiano';
      } 
      case PaisEnum.ecuador: { 
        return 'Ecuatoriano';
      } 
      case PaisEnum.españa: { 
        return 'Español';
      }
      case PaisEnum.francia: { 
        return 'Francés';
      } 
      case PaisEnum.italia: { 
        return 'Italiano';
      }
      default: { 
         return '';
      } 
   } 
  }

}
