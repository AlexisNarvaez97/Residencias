import { Component, OnInit } from '@angular/core';

import { DatePicker } from '@ionic-native/date-picker/ngx';
import { DatePipe } from '@angular/common';
import { Platform, ModalController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';

@Component({
  selector: 'app-editar-infor',
  templateUrl: './editar-infor.page.html',
  styleUrls: ['./editar-infor.page.scss'],
})
export class EditarInforPage implements OnInit {

  mydate = '2019-10-28';
  // https://www.logisticinfotech.com/blog/ionic4-datepicker-component/

  datePickerObj: any = {};
  selectedDate;

  constructor(public modalCtrl: ModalController) { 


  }

  ngOnInit() {
    this.datePickerObj = {
      dateFormat: 'YYYY-MM-DD'
    };
  }

  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { 
         'objConfig': this.datePickerObj, 
         'selectedDate': this.selectedDate 
      }
    });
    await datePickerModal.present();
 
    datePickerModal.onDidDismiss()
      .then((data) => {
        console.log(data);
        this.selectedDate = data.data.date;
      });
  }
  

}
