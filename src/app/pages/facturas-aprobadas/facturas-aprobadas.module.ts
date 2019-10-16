import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FacturasAprobadasPage } from './facturas-aprobadas.page';

const routes: Routes = [
  {
    path: '',
    component: FacturasAprobadasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FacturasAprobadasPage]
})
export class FacturasAprobadasPageModule {}
