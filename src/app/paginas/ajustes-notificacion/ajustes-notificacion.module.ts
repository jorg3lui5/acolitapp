import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjustesNotificacionPageRoutingModule } from './ajustes-notificacion-routing.module';

import { AjustesNotificacionPage } from './ajustes-notificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjustesNotificacionPageRoutingModule
  ],
  declarations: [AjustesNotificacionPage]
})
export class AjustesNotificacionPageModule {}
