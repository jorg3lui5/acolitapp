import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonasDisponiblesPage } from './personas-disponibles.page';

const routes: Routes = [
  {
    path: '',
    component: PersonasDisponiblesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonasDisponiblesPageRoutingModule {}
