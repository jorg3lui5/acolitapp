import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UbicacionDetalladaPage } from './ubicacion-detallada.page';

const routes: Routes = [
  {
    path: '',
    component: UbicacionDetalladaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UbicacionDetalladaPageRoutingModule {}
