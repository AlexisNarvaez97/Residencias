export interface RespuestaLogin {
  status: boolean;
  data: User;
  message: string;
}

export interface User {
  idUser: string;
  nombre: string;
  email: string;
  password: string;
  tipo: string;
  idProveedor: string;
}