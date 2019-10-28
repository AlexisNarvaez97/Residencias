import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalFacturasPendientesPage } from './modal-facturas-pendientes.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFacturasPendientesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalFacturasPendientesPage]
})
export class ModalFacturasPendientesPageModule {}
