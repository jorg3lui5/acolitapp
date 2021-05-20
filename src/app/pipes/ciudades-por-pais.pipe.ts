import { Pipe, PipeTransform } from '@angular/core';
import { PaisEnum } from '../modelo/enum/pais-enum';

@Pipe({
  name: 'ciudadesPorPais'
})
export class CiudadesPorPaisPipe implements PipeTransform {

  /* retorna una lista de ciudades según el país.  */
  
  transform(pais: string, ...args: unknown[]): string[] {
    switch(pais) { 
      case PaisEnum.alemania: { 
         return ['Baviera', 'Berlín',	'Hamburgo','Hesse', 'Turingia']
      } 
      case PaisEnum.argentina: { 
        return ['Buenos Aires', 'Jujuy','La Rioja','Río Negro','Santa Cruz']
      } 
      case PaisEnum.brasil: { 
        return ['Acre', 'Amazonas',	'Bahía','Río de Janeiro', 'Sao Paulo']
      } 
      case PaisEnum.colombia: { 
        return ['Bolívar', 'Cesar',	'Meta','Putumayo', 'Sucre']
      } 
      case PaisEnum.ecuador: { 
        return ['Azuay', 'Guayas',	'Loja','Manabí', 'Pichincha']
      } 
      case PaisEnum.españa: { 
        return ['Barcelona', 'Granada',	'Madrid','Sevilla', 'Valencia']
      }
      case PaisEnum.francia: { 
        return ['Angers', 'Lion',	'Marcella','Niza', 'París']
      } 
      case PaisEnum.italia: { 
        return ['Milán', 'Nápoles',	'Palermo','Roma', 'Turín']
      }
      default: { 
         return [];
      } 
   } 
  }

}
