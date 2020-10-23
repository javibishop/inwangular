import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuariosModule } from './usuarios.module';
@Injectable()
// @Injectable({
//   //providedIn: 'root'
//   providedIn: UsuariosModule
// })
export class UsuarioService {
  usuarios = [];
  constructor(private httpClient: HttpClient) {}

  getUsers() {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'http://localhost:4200',
        'Authorization':'authkey',
        'userid':'1'
      })
    };
    
    return this.httpClient.get('http://localhost:3000/usuarios');
  }
  addUser(usuario, apellido){
    this.usuarios.push({usuario, apellido});
    console.log(this.usuarios.length);
  }

}
