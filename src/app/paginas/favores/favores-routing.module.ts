import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoresPage } from './favores.page';

const routes: Routes = [
  {
    path: '',
    component: FavoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoresPageRoutingModule {}
