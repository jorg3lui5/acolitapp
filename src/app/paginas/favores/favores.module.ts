import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoresPageRoutingModule } from './favores-routing.module';

import { FavoresPage } from './favores.page';
import { ComponentesModule } from '../../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoresPageRoutingModule,
    ComponentesModule,
    
  ],
  declarations: [FavoresPage]
})
export class FavoresPageModule {}
