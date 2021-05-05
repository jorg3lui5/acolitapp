import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../compartido/constantes';

@Component({
  selector: 'app-favores-realizados',
  templateUrl: './favores-realizados.page.html',
  styleUrls: ['./favores-realizados.page.scss'],
})
export class FavoresRealizadosPage implements OnInit {
  item: any;
  constantes: Constantes = new Constantes;

  constructor() { }

  ngOnInit() {
  }

  unread(item){

  }
}
