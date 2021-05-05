import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../compartido/constantes';

@Component({
  selector: 'app-ajustes-notificacion',
  templateUrl: './ajustes-notificacion.page.html',
  styleUrls: ['./ajustes-notificacion.page.scss'],
})
export class AjustesNotificacionPage implements OnInit {
  constantes: Constantes = new Constantes;

  constructor() { }

  ngOnInit() {
  }

}
