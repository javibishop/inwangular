import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) {}

  getUsers() {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'http://localhost:4200',
        'Authorization':'authkey',
        'userid':'1'
      })
    };
    
    return this.httpClient.get('http://localhost:3000/usuarios', httpOptions);
  }
}
