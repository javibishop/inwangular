import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User } from './_models';
import { StateUserService } from './service/state-user.service';
import { Subscription } from 'rxjs';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private stateUserService: StateUserService
    ) {
        this.currentUserSubscription = this.stateUserService.currentUserSubject.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

}