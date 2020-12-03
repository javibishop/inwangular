import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../_models';
import { ConocimientoUsuario } from '../_models/ConocimientoUsuario';

@Injectable({ providedIn: 'root' })
export class UserService {
  url = 'http://localhost:60339/api/user';
  addKnowledgeRoute = '/addKnowledge/';
  removeKnowledgeRoute = '/removeKnowledge/';
  editKnowledgeRoute = '/editKnowledge/';
  urlKnowledge = 'http://localhost:60339/api/knowledge/';
  updateUserRoute = 'http://localhost:60339/api/updateuser/';
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
        return this.http.get(this.url + `/` + id);
    }

    register(user: User) {
      return this.http.post(this.url, user);
    }

    update(user: User) {
        return this.http.put(this.updateUserRoute + `/` + user.id, user);
    }

    delete(id: string) {
        return this.http.delete(this.url + '/' + id);
    }

    getConocimientos(id: string) {
      const urlFinal = this.url + '/knowledges/' + id;
      return this.http.get(urlFinal);
    }

    addConocimiento(id: string, knowledge: ConocimientoUsuario) {
      const finalUrl = this.url + this.addKnowledgeRoute;
      return this.http.put(finalUrl + id, knowledge);
    }

    removeConocimiento(id: string, knowledge: ConocimientoUsuario){
      const finalUrl = this.url + this.removeKnowledgeRoute;
      return this.http.put(finalUrl + id, knowledge);
    }

    editConocimiento(id: string, knowledge: ConocimientoUsuario){
      const finalUrl = this.url + this.editKnowledgeRoute;
      return this.http.put(finalUrl + id, knowledge);
    }
}
