import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjusteFavoresPage } from './ajuste-favores.page';

const routes: Routes = [
  {
    path: '',
    component: AjusteFavoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjusteFavoresPageRoutingModule {}
