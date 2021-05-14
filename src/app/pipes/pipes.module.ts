import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CiudadesPorPaisPipe } from './ciudades-por-pais.pipe';
import { NacionalidadPorPaisPipe } from './nacionalidad-por-pais.pipe';
import { ColorEstadoPipe } from './color-estado.pipe';




@NgModule({
  declarations: [
    CiudadesPorPaisPipe,
    NacionalidadPorPaisPipe,
    ColorEstadoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CiudadesPorPaisPipe,
    NacionalidadPorPaisPipe,
    ColorEstadoPipe
  ]
})
export class PipesModule { }
