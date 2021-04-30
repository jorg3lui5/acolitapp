import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbicacionActualPageRoutingModule } from './ubicacion-actual-routing.module';

import { UbicacionActualPage } from './ubicacion-actual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UbicacionActualPageRoutingModule
  ],
  declarations: [UbicacionActualPage]
})
export class UbicacionActualPageModule {}
