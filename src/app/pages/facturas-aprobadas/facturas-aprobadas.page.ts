import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { FacturasService } from "../../services/facturas.service";
import Factura from "../../interfaces/facturas.model";

@Component({
  selector: "app-facturas-aprobadas",
  templateUrl: "./facturas-aprobadas.page.html",
  styleUrls: ["./facturas-aprobadas.page.scss"]
})
export class FacturasAprobadasPage implements OnInit {
  facturas: Factura[] = [];

  constructor(private facturasService: FacturasService, private router: Router) {}

  ngOnInit() {
    this.facturasService.getFacturas().subscribe((resp: any) => {
      // console.log(resp);

      this.facturas = resp;

      console.log("Facturas aprobadas", this.facturas);
    });
  }

  // No. O.C.
  // Folio.
  // Proveedor.
  // Fecha Aprobada.
  // Ver Archivos.
  // Bill registrada en QBs. //Rojo
  // Acciones. // Editar

  editar() {



    this.router.navigate(["editar-infor/", 123123]);
  }

  pdf() {}

  xml() {}



}
