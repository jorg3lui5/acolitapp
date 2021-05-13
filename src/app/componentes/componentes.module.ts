import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { PiePaginaComponent } from './pie-pagina/pie-pagina.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { ItemFavorComponent } from './item-favor/item-favor.component';
import { FavoresListaComponent } from './favores-lista/favores-lista.component';



@NgModule({
  declarations: [
    CabeceraComponent,
    PiePaginaComponent,
    MenuLateralComponent,
    ItemFavorComponent,
    FavoresListaComponent
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
    ItemFavorComponent,
    FavoresListaComponent
  ],
})
export class ComponentesModule { }
