import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { PiePaginaComponent } from './pie-pagina/pie-pagina.component';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { ItemFavorComponent } from './item-favor/item-favor.component';
import { FavoresListaComponent } from './favores-lista/favores-lista.component';
import { CalificacionComponent } from './calificacion/calificacion.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    CabeceraComponent,
    PiePaginaComponent,
    MenuLateralComponent,
    ItemFavorComponent,
    FavoresListaComponent,
    CalificacionComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    PipesModule,
  ],
  exports: [
    CabeceraComponent,
    PiePaginaComponent,
    MenuLateralComponent,
    RouterModule,
    ItemFavorComponent,
    FavoresListaComponent,
    CalificacionComponent
  ],
})
export class ComponentesModule { }
