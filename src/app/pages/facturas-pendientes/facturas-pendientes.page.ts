import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-facturas-pendientes",
  templateUrl: "./facturas-pendientes.page.html",
  styleUrls: ["./facturas-pendientes.page.scss"]
})
export class FacturasPendientesPage implements OnInit {

  facturas = [
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

  constructor() {}

  ngOnInit() {}

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
