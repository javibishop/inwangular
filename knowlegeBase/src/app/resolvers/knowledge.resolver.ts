import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../service/user.service';
import { ConocimientoUsuario } from '../_models/ConocimientoUsuario';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeResolver implements Resolve<Observable<any>> {

  constructor(private userService: UserService ) {
    }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    return this.userService.getConocimientos(id);
  }

}
