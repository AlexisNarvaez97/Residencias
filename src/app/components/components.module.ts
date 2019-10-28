import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoPendientesComponent } from './info-pendientes/info-pendientes.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations:[
    InfoPendientesComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    InfoPendientesComponent,
  ]
})
export class ComponentsModule { }
