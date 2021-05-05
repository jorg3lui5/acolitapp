import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../compartido/constantes';

@Component({
  selector: 'app-favor-recibido',
  templateUrl: './favor-recibido.page.html',
  styleUrls: ['./favor-recibido.page.scss'],
})
export class FavorRecibidoPage implements OnInit {
  constantes: Constantes = new Constantes;

  constructor() { }

  ngOnInit() {
  }

}
