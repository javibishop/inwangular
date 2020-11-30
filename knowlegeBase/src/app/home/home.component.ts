import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Inject, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserService } from '../service/user.service';

import { User } from '../_models';
import { AuthenticationService } from '../_services';

@Component({ templateUrl: 'home.component.html',
             styleUrls: ['home.component.scss',
                         './table/vendor/bootstrap/css/bootstrap.min.css',
                         './table/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
                        './table/vendor/animate/animate.css',
                        './table/vendor/select2/select2.min.css',
                        './table/vendor/perfect-scrollbar/perfect-scrollbar.css',
                        './table/css/util.css',
                        './table/css/main.css']})
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = null;

    list: any = {};

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private router: Router
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: string) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers();
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    verConocimientos(id: string) {
        this.router.navigate(['/knowledge', id​​]);
    }
}