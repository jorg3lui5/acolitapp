import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoresTodosPage } from './favores-todos.page';

const routes: Routes = [
  {
    path: '',
    component: FavoresTodosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoresTodosPageRoutingModule {}
