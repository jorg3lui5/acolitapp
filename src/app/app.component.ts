import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Componente } from 'src/app/interfaces/interfaces';
import { Constantes } from './compartido/constantes';
import { OpcionesMenuService } from './servicios/menu/opciones-menu.service';
import { UsuarioService } from './servicios/usuario.service';
import { StorageService } from './servicios/librerias/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  implements OnInit{
  componentes: Observable<Componente[]>;
  constantes: Constantes = new Constantes;

  constructor(
    private _opcionesMenuService: OpcionesMenuService,
    private _usuarioService: UsuarioService,
    private _storageService:StorageService,
    private router: Router,

  ) {

  }

  ngOnInit() {
    this.componentes=this._opcionesMenuService.getOpcionesMenu();
  }

  cerrarSesion(){
    this._usuarioService.desloguear()
    .then(()=>{
      this._storageService.guardar(this.constantes._usuario,'').then(
        (data:string)=>{
          this.router.navigate(['/login']);
        }
      )
      .catch(err=>{
          console.log("error: "+err);
      });
    })
    .catch(err=>{
        console.log("error: "+err);
        //this.mostrarMensaje(err);
    });
  }
}