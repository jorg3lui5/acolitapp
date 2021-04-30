import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoresRealizadosPage } from './favores-realizados.page';

const routes: Routes = [
  {
    path: '',
    component: FavoresRealizadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoresRealizadosPageRoutingModule {}
