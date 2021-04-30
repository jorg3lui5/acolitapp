import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'ajuste-favores',
    loadChildren: () => import('./paginas/ajuste-favores/ajuste-favores.module').then( m => m.AjusteFavoresPageModule)
  },
  {
    path: 'ajustes-notificacion',
    loadChildren: () => import('./paginas/ajustes-notificacion/ajustes-notificacion.module').then( m => m.AjustesNotificacionPageModule)
  },
  {
    path: 'datos-personales',
    loadChildren: () => import('./paginas/datos-personales/datos-personales.module').then( m => m.DatosPersonalesPageModule)
  },
  {
    path: 'favor-recibido',
    loadChildren: () => import('./paginas/favor-recibido/favor-recibido.module').then( m => m.FavorRecibidoPageModule)
  },
  {
    path: 'favores',
    loadChildren: () => import('./paginas/favores/favores.module').then( m => m.FavoresPageModule)
  },
  {
    path: 'favores-realizados',
    loadChildren: () => import('./paginas/favores-realizados/favores-realizados.module').then( m => m.FavoresRealizadosPageModule)
  },
  {
    path: 'filtros',
    loadChildren: () => import('./paginas/filtros/filtros.module').then( m => m.FiltrosPageModule)
  },
  {
    path: 'informacion-personal',
    loadChildren: () => import('./paginas/informacion-personal/informacion-personal.module').then( m => m.InformacionPersonalPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./paginas/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    path: 'personas-disponibles',
    loadChildren: () => import('./paginas/personas-disponibles/personas-disponibles.module').then( m => m.PersonasDisponiblesPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./paginas/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'solicitud',
    loadChildren: () => import('./paginas/solicitud/solicitud.module').then( m => m.SolicitudPageModule)
  },
  {
    path: 'ubicacion-actual',
    loadChildren: () => import('./paginas/ubicacion-actual/ubicacion-actual.module').then( m => m.UbicacionActualPageModule)
  },
  {
    path: 'ubicacion-detallada',
    loadChildren: () => import('./paginas/ubicacion-detallada/ubicacion-detallada.module').then( m => m.UbicacionDetalladaPageModule)
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
