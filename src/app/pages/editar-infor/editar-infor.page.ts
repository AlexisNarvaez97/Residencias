import { Component, OnInit } from "@angular/core";

import { DatePicker } from "@ionic-native/date-picker/ngx";
import { DatePipe } from "@angular/common";
import { Platform, ModalController } from "@ionic/angular";
import { Ionic4DatepickerModalComponent } from "@logisticinfotech/ionic4-datepicker";
import * as moment from 'moment';

@Component({
  selector: "app-editar-infor",
  templateUrl: "./editar-infor.page.html",
  styleUrls: ["./editar-infor.page.scss"]
})
export class EditarInforPage implements OnInit {
  mydate = "";
  dateinit = "";
  // https://www.logisticinfotech.com/blog/ionic4-datepicker-component/

  datePickerObj: any;

  selectedDate;

  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {
    this.datePickerObj = {
      dateFormat: "YYYY-MM-DD",
      closeOnSelect: true,
      titleLabel: "Selecciona una fecha",
      weeksList: ["D", "L", "M", "M", "J", "V", "S"],
      clearButton: false,
      setLabel: "Guardar",
      todayLabel: "Hoy",
      closeLabel: "Cerrar",
      momentLocale: 'es-MX',
      // tslint:disable-next-line: max-line-length
      monthsList: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ],
      mondayFirst: true,
      fromDate: new Date('2019-01-01'),
      toDate: new Date()
    };
  }

  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: "li-ionic4-datePicker",
      componentProps: {
        objConfig: this.datePickerObj,
        selectedDate: this.selectedDate
      }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss().then(data => {
      console.log(data);
      this.selectedDate = data.data.date;
    });
  }

  onChangeDateEnd(evento) {
    console.log(evento);
  }
}
