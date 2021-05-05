import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../compartido/constantes';

@Component({
  selector: 'app-personas-disponibles',
  templateUrl: './personas-disponibles.page.html',
  styleUrls: ['./personas-disponibles.page.scss'],
})
export class PersonasDisponiblesPage implements OnInit {
  constantes: Constantes = new Constantes;

  constructor() { }

  ngOnInit() {
  }

}
