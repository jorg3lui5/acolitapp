import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Constantes } from '../../compartido/constantes';

@Component({
  selector: 'app-favores-solicitados',
  templateUrl: './favores-solicitados.page.html',
  styleUrls: ['./favores-solicitados.page.scss'],
})
export class FavoresSolicitadosPage implements OnInit {
  item: any;
  constantes: Constantes = new Constantes;
  
  constructor(
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  unread(item){

  }

  nuevaSolicitud(){
    this.navCtrl.navigateForward("/solicitud");
  }
}
