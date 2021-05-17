import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FavoresPageModule } from './paginas/favores/favores.module';
import { AuthGuard } from './guards/auth.guard';
import { NoLoginGuard } from './guards/no-login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'favores',
    pathMatch: 'full'
  },
  {
    path: 'ajuste-favores',
    loadChildren: () => import('./paginas/ajuste-favores/ajuste-favores.module').then( m => m.AjusteFavoresPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ajustes-notificacion',
    loadChildren: () => import('./paginas/ajustes-notificacion/ajustes-notificacion.module').then( m => m.AjustesNotificacionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'datos-personales',
    loadChildren: () => import('./paginas/datos-personales/datos-personales.module').then( m => m.DatosPersonalesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'favor-recibido/:idFavor',
    loadChildren: () => import('./paginas/favor-recibido/favor-recibido.module').then( m => m.FavorRecibidoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'favores',
    loadChildren: () => import('./paginas/favores/favores.module').then( m => m.FavoresPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'favores-realizados',
    loadChildren: () => import('./paginas/favores-realizados/favores-realizados.module').then( m => m.FavoresRealizadosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'favores-solicitados',
    loadChildren: () => import('./paginas/favores-solicitados/favores-solicitados.module').then( m => m.FavoresSolicitadosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'filtros',
    loadChildren: () => import('./paginas/filtros/filtros.module').then( m => m.FiltrosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'informacion-personal/:usuario',
    loadChildren: () => import('./paginas/informacion-personal/informacion-personal.module').then( m => m.InformacionPersonalPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule),
    canActivate: [NoLoginGuard]
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./paginas/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'personas-disponibles',
    loadChildren: () => import('./paginas/personas-disponibles/personas-disponibles.module').then( m => m.PersonasDisponiblesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule),
    canActivate: [NoLoginGuard]
  },
  {
    path: 'solicitud',
    loadChildren: () => import('./paginas/solicitud/solicitud.module').then( m => m.SolicitudPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'solicitud/:idFavor',
    loadChildren: () => import('./paginas/solicitud/solicitud.module').then( m => m.SolicitudPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ubicacion-actual',
    loadChildren: () => import('./paginas/ubicacion-actual/ubicacion-actual.module').then( m => m.UbicacionActualPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ubicacion-detallada',
    loadChildren: () => import('./paginas/ubicacion-detallada/ubicacion-detallada.module').then( m => m.UbicacionDetalladaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'favores-todos',
    loadChildren: () => import('./paginas/favores-todos/favores-todos.module').then( m => m.FavoresTodosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
{ }
