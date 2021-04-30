import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbicacionDetalladaPageRoutingModule } from './ubicacion-detallada-routing.module';

import { UbicacionDetalladaPage } from './ubicacion-detallada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UbicacionDetalladaPageRoutingModule
  ],
  declarations: [UbicacionDetalladaPage]
})
export class UbicacionDetalladaPageModule {}
