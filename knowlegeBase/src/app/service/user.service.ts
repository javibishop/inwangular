import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models';
import { ConocimientoUsuario } from '../_models/ConocimientoUsuario';

@Injectable({ providedIn: 'root' })
export class UserService {
  url = 'http://localhost:60339/api/user';
  urlKnowledge = 'http://localhost:60339/api/knowledge/';
    httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Authorization': 'authkey',
        'userid': '1'
      })
    }
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.url);
    }

    getById(id: string) {
        return this.http.get(`/users/` + id);
    }

    register(user: User) {
      return this.http.post(this.url, user);
    }

    update(user: User) {
        return this.http.put(`/users/` + user.id, user);
    }

    delete(id: string) {
        return this.http.delete(this.url + '/' + id);
    }

    getConocimientos(id: string) {
      const urlFinal = this.url + '/knowledges/' + id;
      return this.http.get(urlFinal);
    }
}
