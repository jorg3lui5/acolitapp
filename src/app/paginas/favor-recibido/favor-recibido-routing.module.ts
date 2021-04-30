import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavorRecibidoPage } from './favor-recibido.page';

const routes: Routes = [
  {
    path: '',
    component: FavorRecibidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavorRecibidoPageRoutingModule {}
