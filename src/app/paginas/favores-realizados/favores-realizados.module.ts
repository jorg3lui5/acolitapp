import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoresRealizadosPageRoutingModule } from './favores-realizados-routing.module';

import { FavoresRealizadosPage } from './favores-realizados.page';
import { ComponentesModule } from '../../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoresRealizadosPageRoutingModule,
    ComponentesModule
  ],
  declarations: [FavoresRealizadosPage]
})
export class FavoresRealizadosPageModule {}
