import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Conocimiento } from '../_models/conocimiento';


@Injectable({ providedIn: 'root' })
export class KnowledgeService {
  private url = 'http://localhost:60339/api/Knowledge';
  // private httpOptions = {
  //     headers: new HttpHeaders({
  //       'Access-Control-Allow-Origin': 'http://localhost:4200',
  //       'Authorization': 'authkey',
  //       'userid': '1'
  //     })
  //   }

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Conocimiento[]>(this.url);
    }

    getById(id: string) {
        return this.http.get(`${this.url}/${id}`);
    }

    register(conocimiento: Conocimiento) {
      return this.http.post(this.url, conocimiento);
    }

    update(conocimiento: Conocimiento) {
        return this.http.put(`${this.url}/${conocimiento.id}`, conocimiento);
    }

    delete(id: string) {
        return this.http.delete(`${this.url}/${id}`);
    }   
}
