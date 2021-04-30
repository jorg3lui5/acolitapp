import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoresRealizadosPageRoutingModule } from './favores-realizados-routing.module';

import { FavoresRealizadosPage } from './favores-realizados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoresRealizadosPageRoutingModule
  ],
  declarations: [FavoresRealizadosPage]
})
export class FavoresRealizadosPageModule {}
