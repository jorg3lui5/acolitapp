import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosPersonalesPageRoutingModule } from './datos-personales-routing.module';

import { DatosPersonalesPage } from './datos-personales.page';
import { ComponentesModule } from '../../componentes/componentes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosPersonalesPageRoutingModule,
    ComponentesModule,
    ReactiveFormsModule,
    PipesModule
  ],
  declarations: [DatosPersonalesPage]
})
export class DatosPersonalesPageModule {}
