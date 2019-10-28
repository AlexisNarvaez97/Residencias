import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-facturas-pendientes',
  templateUrl: './modal-facturas-pendientes.page.html',
  styleUrls: ['./modal-facturas-pendientes.page.scss'],
})
export class ModalFacturasPendientesPage implements OnInit {

  @Input() factura: [];

  constructor(private modalController: ModalController) { 

  }


  ngOnInit() {


  }

}
