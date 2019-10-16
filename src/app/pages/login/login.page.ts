import { AuthenticateService } from './../../services/authenticate.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import Swal from 'sweetalert2'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  recordarme: boolean = true;

  constructor(private router: Router, private authService: AuthenticateService, private storage: Storage) { 
  }

  ngOnInit() {
  }

  loginUser(form: NgForm) {


    console.log("FORM", form);

    this.router.navigateByUrl('/menu/facturas-pendientes');

    // this.authService
    //   .loginUser(value)
    //   .then(user => {
    //     if (user) {
    //       this.storage.set("isLogged", true);
    //       this.storage.set("currentUser", user);
    //       this.router.navigateByUrl('/menu/facturas-pendientes');
    //       Swal.fire({
    //         position: 'center',
    //         type: 'success',
    //         title: 'Login con exito...',
    //         showConfirmButton: false,
    //         timer: 1000
    //       })
    //     }
    //   })
    //   .catch(error => {
    //     Swal.fire({
    //       position: 'center',
    //       type: 'error',
    //       title: error,
    //       showConfirmButton: false,
    //       timer: 1000
    //     })
    //   });
  }

  // send() {
  //   this.router.navigateByUrl('/menu/facturas-pendientes');
  // }

}
