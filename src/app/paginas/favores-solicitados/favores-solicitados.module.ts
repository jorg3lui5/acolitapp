import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoresSolicitadosPageRoutingModule } from './favores-solicitados-routing.module';

import { FavoresSolicitadosPage } from './favores-solicitados.page';
import { ComponentesModule } from '../../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoresSolicitadosPageRoutingModule,
    ComponentesModule,
    
  ],
  declarations: [FavoresSolicitadosPage]
})
export class FavoresSolicitadosPageModule {}
