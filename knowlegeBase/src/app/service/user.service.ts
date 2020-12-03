import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models';
import {ConocimientoUsuario} from '../_models/ConocimientoUsuario';


@Injectable({ providedIn: 'root' })
export class UserService {
  private url = 'http://localhost:60339/api/user';
  // private httpOptions = {
  //     headers: new HttpHeaders({
  //       'Access-Control-Allow-Origin': 'http://localhost:4200',
  //       'Authorization': 'authkey',
  //       'userid': '1'
  //     })
  //   }

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.url);
    }

    getById(id: string) {
        return this.http.get(`${this.url}/${id}`);
    }

    register(user: User) {
      return this.http.post(this.url, user);
    }

    update(user: User) {
        return this.http.put(`${this.url}/${user.id}`, user);
    }

    delete(id: string) {
        return this.http.delete(`${this.url}/${id}`);
    }

    getConocimientos(id: string) {
      return this.http.get(`${this.url}/knowledges/${id}`);
    }

    addConocimiento(id: string, knowledge: ConocimientoUsuario) {
      return this.http.post(`${this.url}/addKnowledge/${id}`, knowledge);
    }

    removeConocimiento(id: string, knowledge: ConocimientoUsuario){
      return this.http.put(`${this.url}/removeKnowledge/${id}`, knowledge);
    }

    editConocimiento(id: string, knowledge: ConocimientoUsuario){
      return this.http.put(`${this.url}/editKnowledge/${id}`, knowledge);
    }
}
