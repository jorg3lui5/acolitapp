import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../compartido/constantes';

@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.page.html',
  styleUrls: ['./informacion-personal.page.scss'],
})
export class InformacionPersonalPage implements OnInit {
  constantes: Constantes = new Constantes;

  constructor() { }

  ngOnInit() {
  }

}
