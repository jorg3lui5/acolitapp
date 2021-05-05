import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { PiePaginaComponent } from './pie-pagina/pie-pagina.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CabeceraComponent,
    PiePaginaComponent,
    MenuLateralComponent,

  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ],
  exports: [
    CabeceraComponent,
    PiePaginaComponent,
    MenuLateralComponent,
    RouterModule,
  ],
})
export class ComponentesModule { }
