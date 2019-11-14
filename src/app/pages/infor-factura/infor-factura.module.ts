import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { InforFacturaPage } from './infor-factura.page';

const routes: Routes = [
  {
    path: '',
    component: InforFacturaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InforFacturaPage]
})
export class InforFacturaPageModule {}
