import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class StateUserService {
  public currentUserSubject: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor() { }
}
