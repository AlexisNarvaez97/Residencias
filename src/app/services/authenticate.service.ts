import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private storage: Storage) { }


  loginUser(informacion) {

    const email = informacion.email;
    const passwordEncryptada = informacion.password;

    return new Promise(( resolve, reject) => {

      this.storage.get(email).then( usuario => {
        if(usuario) {
          if( usuario.password === btoa(passwordEncryptada)) {
            resolve(usuario);
          } else {
            reject('Contraseña incorrecta')
          }
        } else {
          reject('No existe un usuario con este email');
        }
      });
    });
  }

  registroUsuario(informacion) {

    const email = informacion.email;

    return new Promise( (resolve, reject) => {

      this.storage.get(email).then(usuario => {
        
        if( usuario ) {
          console.log(usuario);
          reject('El usuario ya existe');
        } else {
          informacion.password = btoa(informacion.password);

          this.storage.set(email, informacion).then(() => {
            resolve('El usuario se ha creado con éxito');
            console.log(informacion.password);
          })
        }
      })
    })


  }


}
