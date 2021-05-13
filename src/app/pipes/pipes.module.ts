import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CiudadesPorPaisPipe } from './ciudades-por-pais.pipe';
import { NacionalidadPorPaisPipe } from './nacionalidad-por-pais.pipe';



@NgModule({
  declarations: [
    CiudadesPorPaisPipe,
    NacionalidadPorPaisPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CiudadesPorPaisPipe,
    NacionalidadPorPaisPipe
  ]
})
export class PipesModule { }
