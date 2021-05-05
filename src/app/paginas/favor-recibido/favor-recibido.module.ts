import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavorRecibidoPageRoutingModule } from './favor-recibido-routing.module';

import { FavorRecibidoPage } from './favor-recibido.page';
import { ComponentesModule } from '../../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavorRecibidoPageRoutingModule,
    ComponentesModule,
    
  ],
  declarations: [FavorRecibidoPage]
})
export class FavorRecibidoPageModule {}
