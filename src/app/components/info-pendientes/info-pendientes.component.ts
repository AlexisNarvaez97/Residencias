import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-pendientes',
  templateUrl: './info-pendientes.component.html',
  styleUrls: ['./info-pendientes.component.scss'],
})
export class InfoPendientesComponent implements OnInit {

  @Input() factura;

  constructor() {


    console.log(this.factura);


   }

  ngOnInit() {}

}
