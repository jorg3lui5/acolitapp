import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonasDisponiblesPageRoutingModule } from './personas-disponibles-routing.module';

import { PersonasDisponiblesPage } from './personas-disponibles.page';
import { ComponentesModule } from '../../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonasDisponiblesPageRoutingModule,
    ComponentesModule,
    
  ],
  declarations: [PersonasDisponiblesPage]
})
export class PersonasDisponiblesPageModule {}
