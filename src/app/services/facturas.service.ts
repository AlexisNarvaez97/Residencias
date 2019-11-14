import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Factura from '../interfaces/facturas.model';
import { map } from 'rxjs/operators';
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  selectedObject: any;

  constructor(private http: HttpClient) {
  }


  getFacturas() {

    let num_orden;

    // console.log(`${URL}/facturas`);

    return this.http.get(`${URL}/facturas`).pipe(
      map( (resp: any) => {

        // return resp;

        return resp.map( a => {
          const nombre = a.nombre;
          const idFactura = a.idFactura;
          const fechaC = a.fecha_creacion;
          const numO = a.num_orden;
          const valido = a.valido;
          const estado = a.estado;
          return { nombre, idFactura, fechaC, numO, valido, estado };
        });
        // idFactura;
      })
    );
  }

  getFacturasAprobadas() {

    // return this.http.get<Factura>(`${URL}/facturasAprobadas`);

  }

  getXml(facturaId) {

    const formData = new FormData();
    formData.append('factura_id', facturaId);

    return this.http.post(`${URL}/xmlToJson`, formData).pipe(
      map( (resp: any) => {

        const comprobante: [] = resp.data['cfdi:Comprobante'];
        const conceptos: [] = resp.data['cfdi:Comprobante']['cfdi:Conceptos']['cfdi:Concepto'];
        const emisor: [] = resp.data['cfdi:Comprobante']['cfdi:Emisor'];

        // console.log('CONCEPTOS UWU', conceptos);
        // console.log('EMISOR UWU', emisor);
        // console.log('COMPROBANTE', comprobante);

        return { comprobante, conceptos, emisor };

      })
    );

  }

  postCredit(facturas) {

    const formData = new FormData();

    formData.append('idfactura', '2107');
    formData.append('idorden', '3270');
    formData.append('idproveedor', '259');
    formData.append('total_recibida', '1147.97');
    formData.append('refac_not', '1');

    for (const [index, val] of facturas.entries()) {
      // console.log(`Hola ${val.cantidadSolicitada} + Index ${index}`);
      // console.log(`'item_df[${index}]', '${val.nombre}'|${val.diferencia}|${val.monto}~,`);
      formData.append(`items_df[${index}]`, `${val.nombre}|${val.diferencia}|${val.monto}~,`);
      // tslint:disable-next-line: max-line-length
      formData.append(`items_rec[${index}]`, `${val.nombre}|${val.cantidadSolicitada}|${val.precioUnitario}|${val.cantidadTotal}|0.00|0.00,`);
      // tslint:disable-next-line: max-line-length
    }




    // console.log('Facturas', facturas);


    // formData.append('item_df[0]', 'BOSTON BUTT CON HUESO CAJA FRESCO|8.18|462.17~');
    // formData.append('item_df[1]', 'BOSTON BUTT CON HUESO CAJA FRESCO|8.18|462.17~');
    // formData.append('items_rec[0]', 'CABEZA DE LOMO CAJA FRESCO|1200|63.50|76200.00|0.00|0.00,');
    // formData.append('items_rec[1]', 'BOSTON BUTT CON HUESO CAJA FRESCO|2000|56.50|113000.00|0.00|0.00~');


    return this.http.post(`${URL}/credit`, formData);

  }

  // tslint:disable-next-line: max-line-length
  // si ya tienes el objeto, en tu servicio crea una variable llamada selectedObject, y en donde llamas la ruta, antes de llamar la ruta seteas esa variable, y en tu otra vista en el constructor tomas la variable selectedObject del servicio y la muestras, es como una pequeña cache


}
