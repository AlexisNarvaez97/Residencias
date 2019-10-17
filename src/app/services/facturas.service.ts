import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import Factura from '../interfaces/facturas.model';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private http: HttpClient) { 
  }


  getFacturas() {

    return this.http.get<Factura>(`${URL}/facturas`);
  }


}
