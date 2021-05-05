import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../compartido/constantes';

@Component({
  selector: 'app-ubicacion-detallada',
  templateUrl: './ubicacion-detallada.page.html',
  styleUrls: ['./ubicacion-detallada.page.scss'],
})
export class UbicacionDetalladaPage implements OnInit {
  constantes: Constantes = new Constantes;

  constructor() { }

  ngOnInit() {
  }

}
