import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjusteFavoresPageRoutingModule } from './ajuste-favores-routing.module';

import { AjusteFavoresPage } from './ajuste-favores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjusteFavoresPageRoutingModule
  ],
  declarations: [AjusteFavoresPage]
})
export class AjusteFavoresPageModule {}
