import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { MenuPage } from "./menu.page";

const routes: Routes = [
  {
    path: "menu",
    component: MenuPage,
    children: [
      {
        path: "facturas-pendientes",
        loadChildren:
          "../facturas-pendientes/facturas-pendientes.module#FacturasPendientesPageModule"
      },
      {
        path: "facturas-aprobadas",
        loadChildren:
          "../facturas-aprobadas/facturas-aprobadas.module#FacturasAprobadasPageModule"
      }
    ]
  },
  {
    path: '',
    redirectTo: 'menu/facturas-pendientes'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
