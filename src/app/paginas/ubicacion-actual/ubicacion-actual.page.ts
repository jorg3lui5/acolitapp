import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../compartido/constantes';

@Component({
  selector: 'app-ubicacion-actual',
  templateUrl: './ubicacion-actual.page.html',
  styleUrls: ['./ubicacion-actual.page.scss'],
})
export class UbicacionActualPage implements OnInit {
  constantes: Constantes = new Constantes;

  constructor() { }

  ngOnInit() {
  }

}
