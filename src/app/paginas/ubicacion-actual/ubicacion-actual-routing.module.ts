import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UbicacionActualPage } from './ubicacion-actual.page';

const routes: Routes = [
  {
    path: '',
    component: UbicacionActualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UbicacionActualPageRoutingModule {}
