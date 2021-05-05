import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjustesNotificacionPageRoutingModule } from './ajustes-notificacion-routing.module';

import { AjustesNotificacionPage } from './ajustes-notificacion.page';
import { ComponentesModule } from '../../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjustesNotificacionPageRoutingModule,
    ComponentesModule,
  ],
  declarations: [AjustesNotificacionPage]
})
export class AjustesNotificacionPageModule {}
