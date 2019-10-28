import { Component, OnInit } from "@angular/core";
import { FacturasService } from "src/app/services/facturas.service";
import Factura from "src/app/interfaces/facturas.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-facturas-pendientes",
  templateUrl: "./facturas-pendientes.page.html",
  styleUrls: ["./facturas-pendientes.page.scss"]
})
export class FacturasPendientesPage implements OnInit {
  facturas: Factura[] = [];

  constructor(
    private facturasService: FacturasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.facturasService.getFacturas().subscribe((resp: any) => {
      // console.log(resp);

      this.facturas = resp;

      console.log("Facturas", this.facturas);
    });
  }

  profile() {}

  aceptar(orden) {

    this.facturasService.selectedObject = orden;

    const id = orden;

    this.router.navigate(["infor-factura/", 123123]);
  }

  aceptada() {}

  rechazar() {}

  logout() {}


  xml() {
    console.log('XML');
  }

  pdf() {
    console.log('PDF');
  }
}
