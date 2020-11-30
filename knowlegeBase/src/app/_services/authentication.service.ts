import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models';
import { StateUserService } from '../service/state-user.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public currentUser: Observable<User>;
    url = 'http://localhost:60339/api/user';

    constructor(private http: HttpClient, private stateUserService: StateUserService) {
        // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        // this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.stateUserService.currentUserSubject.value;
    }

    login(nombreUsuario: string, password: string) {
        return this.http.post<any>(this.url + `/authenticate`, { nombreUsuario, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.nombreUsuario && user.password) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.stateUserService.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.stateUserService.currentUserSubject.next(null);
    }
}