import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../compartido/constantes';

@Component({
  selector: 'app-ajuste-favores',
  templateUrl: './ajuste-favores.page.html',
  styleUrls: ['./ajuste-favores.page.scss'],
})
export class AjusteFavoresPage implements OnInit {
  constantes: Constantes = new Constantes;

  constructor() { }

  ngOnInit() {
  }

}
