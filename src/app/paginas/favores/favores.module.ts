import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoresPageRoutingModule } from './favores-routing.module';

import { FavoresPage } from './favores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoresPageRoutingModule
  ],
  declarations: [FavoresPage]
})
export class FavoresPageModule {}
