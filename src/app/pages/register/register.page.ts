import { AuthenticateService } from './../../services/authenticate.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  stateOptions = [
    {
      nombre: 'Proveedor',
      id: 1521
    },
    {
      nombre: 'Tecnico',
      id: 2123
    },
    {
      nombre: 'Vendedor',
      id: 9821
    }
  ];

  constructor(private authService: AuthenticateService, private navCtrl: NavController) { }

  ngOnInit() {
  }

  tryRegister(value) {
    this.authService
      .registroUsuario(value)
      .then(a => {
        console.log(a);
        // this.errorMessage = "";
        // this.successMessage = "Tu cuenta se ha creado con éxito.";
        Swal.fire({
          type: 'success',
          title: 'Tu cuenta se ha creado con éxito',
          animation: false,
          customClass: {
            popup: 'animated heartBeat'
          }
        })
        setTimeout(() => {
          this.navCtrl.navigateForward("/login");
        }, 1000);
      })
      .catch(err => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err
        })
      });
  }


}
