import { Component, OnInit } from '@angular/core';
import { Constantes } from '../../compartido/constantes';
import { UsuarioService } from '../../servicios/usuario.service';
import { StorageService } from '../../servicios/librerias/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favores',
  templateUrl: './favores.page.html',
  styleUrls: ['./favores.page.scss'],
})
export class FavoresPage implements OnInit {

  constantes: Constantes = new Constantes;
  constructor(
    private router: Router,

  ) { }

  ngOnInit() {

  }

  nuevoFavor(){
    this.router.navigate(['/solicitud']);
  }
}
