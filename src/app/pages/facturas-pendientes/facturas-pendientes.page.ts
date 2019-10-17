import { Component, OnInit } from "@angular/core";
import { FacturasService } from 'src/app/services/facturas.service';
import Factura from 'src/app/interfaces/facturas.model';

@Component({
  selector: "app-facturas-pendientes",
  templateUrl: "./facturas-pendientes.page.html",
  styleUrls: ["./facturas-pendientes.page.scss"]
})
export class FacturasPendientesPage implements OnInit {

  facturas: Factura[] = [];

  factura = [
    {
      name: "Pepsi SA DE CV",
      number_orden: 3200,
      date: '01/10/2019',
      estado: true,
      archivos: [
        {
          pdf: 'hola'
        },
        {
          xml: 'hello'
        }
      ]
    },
    {
      name: "COCA SA DE CV",
      number_orden: 3200,
      date: '01/10/2019',
      estado: true,
      archivos: [
        {
          pdf: 'hola'
        },
        {
          xml: 'hello'
        }
      ]
    },
    {
      name: "Tecate SA DE CV",
      number_orden: 3200,
      date: '01/10/2019',
      estado: true,
      archivos: [
        {
          pdf: 'hola'
        },
        {
          xml: 'hello'
        }
      ]
    },

  ]

  constructor(private facturasService: FacturasService) {}

  ngOnInit() {


    this.facturasService.getFacturas().subscribe( (resp: any) => {
      
      console.log(resp);

      this.facturas = resp;

      console.log('Facturas', this.facturas);


    })


  }

  profile() {

  }

  aceptar() {
    
  }

  aceptada () {

  }

  rechazar() {

  }

  logout() {

  }
}
