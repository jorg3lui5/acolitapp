import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoresSolicitadosPage } from './favores-solicitados.page';

const routes: Routes = [
  {
    path: '',
    component: FavoresSolicitadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoresSolicitadosPageRoutingModule {}
