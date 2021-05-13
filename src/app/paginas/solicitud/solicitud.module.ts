import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudPageRoutingModule } from './solicitud-routing.module';

import { SolicitudPage } from './solicitud.page';
import { ComponentesModule } from '../../componentes/componentes.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudPageRoutingModule,
    ComponentesModule,
    ReactiveFormsModule
    
  ],
  declarations: [SolicitudPage]
})
export class SolicitudPageModule {}
