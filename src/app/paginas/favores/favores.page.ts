import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../compartido/constantes';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-favores',
  templateUrl: './favores.page.html',
  styleUrls: ['./favores.page.scss'],
})
export class FavoresPage implements OnInit {

  constantes: Constantes = new Constantes;

  constructor(
    private _usuarioService: UsuarioService,

  ) { }

  ngOnInit() {
    //this._usuarioService.logout();
  }

}
