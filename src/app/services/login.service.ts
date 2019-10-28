import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { RespuestaLogin } from '../interfaces/loginResp.model';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private storage: Storage) {}

  loginUser(email: string, password: string) {

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    console.log(formData);

    const usuario = {
      email,
      password
    };

    let body = JSON.stringify(usuario);

    console.log(body);

    // console.log(`${URL}/login`);

    return this.http.post<RespuestaLogin>(`${URL}/login`, formData);
  }


}
