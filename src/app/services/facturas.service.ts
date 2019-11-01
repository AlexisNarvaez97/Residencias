import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Factura from '../interfaces/facturas.model';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  selectedObject: any;

  constructor(private http: HttpClient) {
  }


  getFacturas() {

    // console.log(`${URL}/facturas`);

    return this.http.get<Factura>(`${URL}/facturas`);
  }

  getFacturasAprobadas() {

    // return this.http.get<Factura>(`${URL}/facturasAprobadas`);

  }

  // tslint:disable-next-line: max-line-length
  // si ya tienes el objeto, en tu servicio crea una variable llamada selectedObject, y en donde llamas la ruta, antes de llamar la ruta seteas esa variable, y en tu otra vista en el constructor tomas la variable selectedObject del servicio y la muestras, es como una pequeña cache


}
