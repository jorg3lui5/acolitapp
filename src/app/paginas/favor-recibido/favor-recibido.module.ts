import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavorRecibidoPageRoutingModule } from './favor-recibido-routing.module';

import { FavorRecibidoPage } from './favor-recibido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavorRecibidoPageRoutingModule
  ],
  declarations: [FavorRecibidoPage]
})
export class FavorRecibidoPageModule {}
