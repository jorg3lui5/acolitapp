import { Component, Input, OnInit } from '@angular/core';
import { FavorDTO } from '../../modelo/dto/favor-dto';

/* muestra la lista de favores según el filtro aplicado (todos los favores, favores solicitados o favores realizados)
 */
@Component({
  selector: 'app-favores-lista',
  templateUrl: './favores-lista.component.html',
  styleUrls: ['./favores-lista.component.scss'],
})
export class FavoresListaComponent implements OnInit {

  @Input() favores: FavorDTO[]=[];
  @Input() tipoFavor: string;
  
  constructor() { }

  ngOnInit() {}

}
