import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoresPage } from './favores.page';
import { FavoresPageModule } from './favores.module';
import { FavoresRealizadosPageModule } from '../favores-realizados/favores-realizados.module';
import { FavoresSolicitadosPageModule } from '../favores-solicitados/favores-solicitados.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/favores/favores-todos',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FavoresPage,
    children: [
      {
        path: 'favores-todos',
        loadChildren: () => import('../favores-todos/favores-todos.module').then(m=>m.FavoresTodosPageModule)
      },
      {
        path: 'favores-solicitados',
        loadChildren: () => import('../favores-solicitados/favores-solicitados.module').then(m=>m.FavoresSolicitadosPageModule)
      },
      {
        path: 'favores-realizados',
        loadChildren: () => import('../favores-realizados/favores-realizados.module').then(m=>m.FavoresRealizadosPageModule)
      },
      // {
      //   path: '',
      //   redirectTo: '/favores/favores-todos',
      //   pathMatch: 'full'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoresPageRoutingModule {}
