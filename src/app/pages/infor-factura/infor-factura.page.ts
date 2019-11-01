import { Component, OnInit } from "@angular/core";
import xml2js from "xml2js";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NgxXml2jsonService } from "ngx-xml2json";
import { xml2json } from "xml-js";
import * as moment from 'moment';

import { parseString } from "xml2js";

import { FacturasService } from "../../services/facturas.service";

import Swal from "sweetalert2";
import { EmailComposer } from "@ionic-native/email-composer/ngx";
import Factura from '../../interfaces/facturas.model';

@Component({
  selector: "app-infor-factura",
  templateUrl: "./infor-factura.page.html",
  styleUrls: ["./infor-factura.page.scss"]
})
export class InforFacturaPage implements OnInit {
  facturaRechazada = false;

  cantidadSolicitada = 1210.8;
  precioUnitario = 63.5;

  cantidadRecibida = 0;

  xml = ``;
  xmlString = "";

  factura: Factura;

  public xmlItems: any;

  // tslint:disable-next-line: max-line-length
  constructor(
    private router: ActivatedRoute,
    private _http: HttpClient,
    private route: Router,
    private ngxXml2jsonService: NgxXml2jsonService,
    private facturasService: FacturasService,
    private emailComposer: EmailComposer
  ) {
    // console.log(this.facturasService.selectedObject);

    this.factura = this.facturasService.selectedObject;

    console.log("DATA", this.factura);
  }

  ngOnInit() {
    // const parser = new DOMParser();
    // const xml = parser.parseFromString(this.xml, 'text/xml');
    // const obj = this.ngxXml2jsonService.xmlToJson(xml);
    // console.log(obj);
    // this.loadXML();
    // this.readXml();

    // let parseString = require("xml2js").parseString;
  }

  modelChanged(cantidadRecibida: number) {
    // console.log(cantidda);

    this.cantidadRecibida = cantidadRecibida;

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
        ...this.factura,
      }

      factura.estado = '1.2';

      console.log("Selecciono refacturacion");

      console.log('Refacturacion', factura);


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
        ...this.factura,
      }

      factura.estado = '1.1';

      console.log('Nota', factura);

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

  aceptar() {

    // const date = new Date();
    const now = moment().format('YYYY MM DD');

    console.log(now);

    const cantidadR = this.cantidadRecibida;
    const cantidadS = this.cantidadSolicitada;
    const precioU = this.precioUnitario;

    const diferencia = Number((cantidadS - cantidadR).toFixed(2));
    const monto = Number((diferencia * precioU).toFixed(2));

    console.log('Cantidad', diferencia);
    console.log('Monto', monto);


    console.log(this.cantidadRecibida);

    if (cantidadR < cantidadS) {
      Swal.fire({
        type: "error",
        title: "Existe diferencia entre la mercancía recibida y la facturada",
        text: "¿Desea guardar la información?",
        showCancelButton: true,
        confirmButtonText: "Aceptar"
      }).then(result => {
        if (result.value) {
          this.facturaRechazada = true;
          Swal.fire({
            position: "center",
            type: "error",
            title: `Existe una diferencia de ${diferencia.toFixed(2)}`,
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
    }

    // const cantidadAlmacen = ( document.getElementById('cantidad') as HTMLInputElement).value;

    // console.log(cantidadAlmacen);

    // alert('¿Esta seguro de seguir?');
  }

  loadXML() {
    this._http
      .get("./../../../assets/XML/8250336681.xml", {
        headers: new HttpHeaders()
          .set("Content-Type", "text/xml")
          .append("Access-Control-Allow-Methods", "GET")
          .append("Access-Control-Allow-Origin", "*")
          .append(
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"
          ),
        responseType: "text" as "json"
      })
      .subscribe((data: any) => {
        // console.log(data);
        // this.xmlString = data;
        this.xml = data;
        // console.log(this.xmlString);
        this.readXml(this.xml);
        // console.log(this.xml);
        // console.log('String', this.xmlString);
      });
  }

  estem() {
    console.log(typeof this.xmlString);

    let json = JSON.stringify(this.xmlString);

    let jsonParse = JSON.parse(json);

    // console.log(json);

    // console.log(jsonParse);
  }

  readXml(xmlString) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, "text/xml");
    const obj = this.ngxXml2jsonService.xmlToJson(xml);
    console.log(obj);
    const conceptos = obj["cfdi:Comprobante"]["cfdi:Conceptos"];
    const concepto = conceptos["cfdi:Concepto"];
    console.log(conceptos);
    console.log(concepto);

    // conceptos.forEach( resp => {
    //   console.log(resp);
    // });
  }

  async aceptarFactura() {
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 3000
    });

    const { value: text } = await Swal.fire({
      title: "¡¿Estas seguro de continuar con el proceso?!",
      text: "Al dar click estas rechazando la factura...",
      type: "error",
      input: "textarea",
      inputPlaceholder: "Razon de rechazo...",
      inputAttributes: {
        "aria-label": "Razon de rechazo..."
      },
      showCancelButton: true
    });
    if (text) {
      const email = {
        to: "alexisnarvaez97@hotmail.com",
        cc: "alexisnarvaez97@hotmail.com",
        subject: "Factura",
        body: text,
        isHtml: true
      };
      // Send a text message using default options
      this.emailComposer.open(email);

      //   console.log('Respuesta', text);
      //   // Swal.fire(text);
      //   Toast.fire({
      //     type: "success",
      //     title: "Factura rechazada."
      //   });
      // }
      // this.route.navigateByUrl("/menu/facturas-pendientes");
    }

    // parseXML(data) {
    //   return new Promise(resolve => {
    //     var k: string | number,
    //       arr = [],
    //       parser = new xml2js.Parser(
    //         {
    //           trim: true,
    //           explicitArray: true
    //         });
    //     parser.parseString(data, function (err, result) {
    //       var obj = result.Employee;
    //       for (k in obj.emp) {
    //         var item = obj.emp[k];
    //         arr.push({
    //           id: item.id[0],
    //           name: item.name[0],
    //           gender: item.gender[0],
    //           mobile: item.mobile[0]
    //         });
    //       }
    //       resolve(arr);
    //     });
    //   });
    // }

    //   getItemTo() {
    //     const xml = this.xmlString;

    //     const result1 = xml2json(xml, { compact: true, spaces: 4 });
    //     const result2 = xml2json(xml, { compact: false, spaces: 4 });
    //     console.log(result1, "\n", result2);

    //     return result1;
    //   }
    // }
  }
}
