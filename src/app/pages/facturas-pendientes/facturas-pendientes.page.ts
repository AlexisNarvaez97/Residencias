import { Component, OnInit } from "@angular/core";
import { FacturasService } from "src/app/services/facturas.service";
import Factura from "src/app/interfaces/facturas.model";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { Platform } from "@ionic/angular";
import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import {
  DocumentViewer,
  DocumentViewerOptions
} from "@ionic-native/document-viewer/ngx";

@Component({
  selector: "app-facturas-pendientes",
  templateUrl: "./facturas-pendientes.page.html",
  styleUrls: ["./facturas-pendientes.page.scss"]
})
export class FacturasPendientesPage implements OnInit {
  facturas: any[] = [];

  constructor(
    // tslint:disable-next-line: max-line-length
    // tslint:disable-next-line: deprecation
    // tslint:disable-next-line: max-line-length
    private facturasService: FacturasService,
    private platform: Platform,
    private file: File,
    private ft: FileTransfer,
    private fileOpener: FileOpener,
    private document: DocumentViewer,
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

    // const id = orden;

    // this.router.navigate(["infor-factura/", orden.idFactura]);
  }

  aceptada() {}

  async rechazar(facturaR) {
    let factura: Factura;

    // console.log('Factura', factura);

    factura = {
      ...facturaR
    };

    // factura.estado = '2';

    // console.log(factura);

    const value = await Swal.fire({
      title: "¡¿Estas seguro de continuar con el proceso?!",
      text: "Al dar click estas rechazando la factura...",
      type: "error",
      input: "textarea",
      inputPlaceholder: "Razon de rechazo...",
      showCancelButton: true
    }).then(resp => {
      if (resp) {
        factura.razon_rechazo = resp.value || '';
        factura.estado = "2";
        console.log(factura);
      } else {
        return;
      }
    });
  }

  logout() {}

  xml() {
    console.log("XML");
  }

  openLocalPdf() {
    const filePath = this.file.applicationDirectory + "www/assets";
    console.log("FilePath", filePath);

    if (this.platform.is("android")) {
      const fakeName = Date.now();

      this.file
        .copyFile(
          filePath,
          "ejemplo.PDF",
          this.file.dataDirectory,
          `${fakeName}.pdf`
        )
        .then(result => {
          console.log("Result", result);
          console.log("Data Directory", this.file.dataDirectory);
          this.fileOpener.open(result.nativeURL, "application/pdf");
        });
    } else {
      const options: DocumentViewerOptions = {
        title: "My PDF"
      };
      this.document.viewDocument(
        `${filePath}/ejemplo.PDF`,
        "application/pdf",
        options
      );
    }
  }
}
