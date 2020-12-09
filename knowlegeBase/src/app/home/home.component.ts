import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, Inject, ChangeDetectorRef, HostListener, ElementRef, Renderer, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { StateUserService } from '../service/state-user.service';
import { UserService } from '../service/user.service';

import { User } from '../_models';
import { AuthenticationService } from '../_services';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss',
        './table/vendor/bootstrap/css/bootstrap.min.css',
        './table/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
        './table/vendor/animate/animate.css',
        './table/vendor/select2/select2.min.css',
        './table/vendor/perfect-scrollbar/perfect-scrollbar.css',
        './table/css/util.css',
        './table/css/main.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = null;

    list: any = {};
    showModal = false;
    idUserToDelete = null;

    constructor(
        private userService: UserService,
        private router: Router,
        private stateUserService: StateUserService,
        private element: ElementRef,
        private renderer: Renderer2
    ) {
        this.currentUserSubscription = this.stateUserService.currentUserSubject.subscribe(user => {
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

    deleteUser() {
        this.userService.delete(this.idUserToDelete).pipe(first()).subscribe(() => {
            this.loadAllUsers();
        });
        this.idUserToDelete = null;
        this.showModal = false;
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    verConocimientos(id: string) {
        this.router.navigate(['/knowledge', id]);
    }

    deleteModal(id) {
        this.showModal = true;
        this.idUserToDelete = id;
    }

    filter(val) {
        var table, rows, i;
        table = document.getElementById("usersTable");
        rows = table.getElementsByTagName("tr");
        for (i = 1; i < rows.length; i++) {
            let dataRow = [];
            dataRow = [].slice.call(table.rows[i].cells);
            const res = dataRow.filter(
                e => e.innerHTML.toLowerCase().includes(val)
                );
            if (res.length == 0){
                this.renderer.setStyle(rows[i], 'display', "none");
            }else{                
                this.renderer.setStyle(rows[i], 'display', "table-row");
            }
        } 
    }
}