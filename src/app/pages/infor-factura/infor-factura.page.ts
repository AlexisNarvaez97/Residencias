import { Component, OnInit } from "@angular/core";
import xml2js from "xml2js";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NgxXml2jsonService } from "ngx-xml2json";
import { xml2json } from "xml-js";
import * as moment from "moment";

import { parseString } from "xml2js";

import { FacturasService } from "../../services/facturas.service";

import Swal from "sweetalert2";
import { EmailComposer } from "@ionic-native/email-composer/ngx";
import Factura from "../../interfaces/facturas.model";
import { NavController } from "@ionic/angular";
import { Xliff } from "@angular/compiler";

@Component({
  selector: "app-infor-factura",
  templateUrl: "./infor-factura.page.html",
  styleUrls: ["./infor-factura.page.scss"]
})
export class InforFacturaPage implements OnInit {
  cantidadRandom = 0.0;

  boton_verde = true;
  boton_rojo = false;

  facturaRechazada = false;

  columns = [{ name: "Nombre" }, { name: "Diferencia" }, { name: "Monto" }];

  cantidadSolicitada;
  precioUnitario;

  facturaDiferencia;

  cantidadTotal;

  facturaDif = [];

  comprobante: any[] = [];
  conceptos: any[] = [];
  emisor: any[] = [];
  facturaXML;

  cantidadRecibida = 0;

  xml = ``;
  xmlString = "";

  factura: Factura;

  public xmlItems: any;

  // tslint:disable-next-line: max-line-length
  constructor(
    private router: ActivatedRoute,
    private navCtrl: NavController,
    private _http: HttpClient,
    private route: Router,
    private ngxXml2jsonService: NgxXml2jsonService,
    private facturasService: FacturasService,
    private emailComposer: EmailComposer
  ) {
    const fac_id = this.router.snapshot.paramMap.get("id");

    console.log("FACTURA ID", fac_id);

    this.leerXML(fac_id);
    // console.log(this.facturasService.selectedObject);

    this.factura = this.facturasService.selectedObject;

    // console.log("DATA", this.factura);
  }

  ngOnInit() {}

  modelChanged(cantidadRecibida: number) {
    // console.log(cantidda);

    this.cantidadRecibida = cantidadRecibida;

    console.log(cantidadRecibida);

    // this.aceptar();

    // let cantidadFaltante = 0;
    // let cantidadTotalFaltante = 0;

    // if (cantidadRecibida > this.cantidadSolicitada) {
    //   console.log('Te pasaste XD');
    // } else {
    //   cantidadFaltante = this.cantidadSolicitada - cantidadRecibida;
    //   cantidadTotalFaltante = cantidadFaltante * this.precioUnitario;
    //   console.log('Faltante', cantidadFaltante);
    //   console.log('Total Faltante', cantidadTotalFaltante);
    //   console.log('+');
    // }
  }

  changeRadio(event) {
    let factura: Factura;

    const value = event.detail.value;

    console.log(event.detail.value);

    if (value === "refacturacion") {
      factura = {
        ...this.factura
      };

      factura.estado = "1.2";

      console.log("Selecciono refacturacion");

      console.log("Refacturacion", factura);

      this.emailComposer.open({
        app: "gmail",
        to: "alexisnarvaez97@hotmail.com",
        cc: "alexisnarvaez97@hotmail.com",
        subject: `${this.factura.nombre} con N.O.C ${this.factura.num_orden}`,
        body: "Refacturación",
        isHtml: true
      });
    } else if (value === "nota") {
      factura = {
        ...this.factura
      };

      factura.estado = "1.1";

      console.log("Nota", factura);

      console.log("Selecciono nota");
      this.emailComposer.open({
        app: "gmail",
        to: "alexisnarvaez97@hotmail.com",
        cc: "alexisnarvaez97@hotmail.com",
        subject: `${this.factura.nombre} con N.O.C ${this.factura.num_orden}`,
        body: "Nota de credito",
        isHtml: true
      });
    }
  }

  leerXML(facturaId) {
    let nombre;
    let cantidad;
    let monto;
    let unitario;

    this.facturasService.getXml(facturaId).subscribe(resp => {
      this.comprobante = resp.comprobante;
      this.emisor = resp.emisor;

      if (resp.conceptos.length > 1) {
        this.conceptos = resp.conceptos;
      } else {
        this.conceptos.push(resp.conceptos);
      }
      console.log("Conceptos", this.conceptos);

      // console.log("Comprobante", this.comprobante);
      // console.log("Emisor", this.emisor);
    });
  }

  aceptar(indexFactura) {
    // console.log("index", indexFactura);

    let cantidadSolicitada;
    let cantidadTotal;
    let precioUnitario;
    let nombre;

    // console.log(this.cantidadSolicitada);
    // const date = new Date();
    const now = moment().format("YYYY MM DD");

    for (const [index, val] of this.conceptos.entries()) {
      if (index === indexFactura) {
        // console.log("index", index, "-value", val);
        nombre = val.Descripcion;
        cantidadSolicitada = val.Cantidad;
        cantidadTotal = val.Importe;
        precioUnitario = val.ValorUnitario;
        const cantidadR = this.cantidadRecibida;

        const diferencia = Number((cantidadSolicitada - cantidadR).toFixed(2));
        const monto = Number((diferencia * precioUnitario).toFixed(2));

        // console.log('Nombre', nombre);
        // console.log('Diferencia', diferencia);
        // console.log('Monto', monto);

        if (cantidadR < cantidadSolicitada) {
          Swal.fire({
            type: "error",
            title:
              "Existe diferencia entre la mercancía recibida y la facturada",
            text: "¿Desea guardar la información?",
            showCancelButton: true,
            confirmButtonText: "Aceptar"
          }).then(result => {
            if (result.value) {
              // this.boton_verde = false;
              // this.boton_rojo = true;

              const facturaDiferencia = {
                index,
                cantidadTotal,
                precioUnitario,
                cantidadSolicitada,
                nombre,
                diferencia,
                monto
              };

              // console.log(`${nombre}|${diferencia}|${monto}~`);

              this.facturaDif.push(facturaDiferencia);

              console.log(this.facturaDif);

              this.facturaRechazada = true;
              Swal.fire({
                position: "center",
                type: "error",
                title: `Existe una diferencia de ${diferencia.toFixed(2)}`,
                showConfirmButton: false,
                timer: 2000
              });

              // const longitudArray = this.facturaDif.length;

              // console.log('Longitud', longitudArray);

              // this.facturaDif.forEach( resp => {
              //   // console.log('SHEKEROU', resp);

              //   if ( resp.index === 1) {
              //     this.facturaDif[index] = facturaDiferencia;
              //     // console.log('Es 1 men');
              //   } else {
              //     // console.log('No es uno men, son otros');
              //   }

              // });
            }
          });
        } else {
          console.log("No hay diferencias pero si te pasaste de verga");
        }
      }
    }
    // console.log('ARREGLO', this.facturaDif);
    // console.log(this.facturaDiferencia);
  }

  async aceptarFactura() {
    const facturaDif = this.facturaDif;
    // console.log(facturaDif);

    await this.facturasService.postCredit(facturaDif).subscribe(resp => {
      console.log("Respuesta CREDIT", resp);
    });

    this.navCtrl.navigateRoot("/menu/facturas-pendientes");

    // const Toast = Swal.mixin({
    //   toast: true,
    //   position: "center",
    //   showConfirmButton: false,
    //   timer: 3000
    // });

    // const { value: text } = await Swal.fire({
    //   title: "¡¿Estas seguro de continuar con el proceso?!",
    //   text: "Al dar click estas rechazando la factura...",
    //   type: "error",
    //   input: "textarea",
    //   inputPlaceholder: "Razon de rechazo...",
    //   inputAttributes: {
    //     "aria-label": "Razon de rechazo..."
    //   },
    //   showCancelButton: true
    // });
    // if (text) {
    //   const email = {
    //     to: "alexisnarvaez97@hotmail.com",
    //     cc: "alexisnarvaez97@hotmail.com",
    //     subject: "Factura",
    //     body: text,
    //     isHtml: true
    //   };
    //   // Send a text message using default options
    //   this.emailComposer.open(email);

    //   //   console.log('Respuesta', text);
    //   //   // Swal.fire(text);
    //   //   Toast.fire({
    //   //     type: "success",
    //   //     title: "Factura rechazada."
    //   //   });
    //   // }
    //   // this.route.navigateByUrl("/menu/facturas-pendientes");
    // }
  }
}
