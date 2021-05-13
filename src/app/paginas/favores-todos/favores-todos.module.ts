import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoresTodosPageRoutingModule } from './favores-todos-routing.module';

import { FavoresTodosPage } from './favores-todos.page';
import { ComponentesModule } from '../../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoresTodosPageRoutingModule,
    ComponentesModule
  ],
  declarations: [FavoresTodosPage]
})
export class FavoresTodosPageModule {}
