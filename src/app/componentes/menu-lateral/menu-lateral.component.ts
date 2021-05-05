import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Componente } from 'src/app/interfaces/interfaces';
import { OpcionesMenuService } from '../../servicios/menu/opciones-menu.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})
export class MenuLateralComponent implements OnInit {
  componentes: Observable<Componente[]>;

  constructor(
    private _opcionesMenuService: OpcionesMenuService
  ) {

  }

  ngOnInit() {
    this.componentes=this._opcionesMenuService.getOpcionesMenu();
  }

}
