import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbicacionDetalladaPageRoutingModule } from './ubicacion-detallada-routing.module';

import { UbicacionDetalladaPage } from './ubicacion-detallada.page';
import { ComponentesModule } from '../../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UbicacionDetalladaPageRoutingModule,
    ComponentesModule,
    
  ],
  declarations: [UbicacionDetalladaPage]
})
export class UbicacionDetalladaPageModule {}
