import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjustesNotificacionPage } from './ajustes-notificacion.page';

const routes: Routes = [
  {
    path: '',
    component: AjustesNotificacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjustesNotificacionPageRoutingModule {}
