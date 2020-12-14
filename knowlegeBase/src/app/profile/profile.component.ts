import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../_models';
import { Subscription } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  user = null; //new User();
  message = '';
  isError = null;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if(id !== null && id !== ''){
      this.subscriptions.push(this.userService.getById(id).subscribe( r => {
        this.user = r as User;
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x=> x.unsubscribe());
  }

  onSaveClick(){
    this.subscriptions.push(this.userService.update(this.user).subscribe((data: any) =>{
      this.message = '';
      if (data.statusCode) {
        this.isError = false;
        this.message = "Perfil guardado con exito..."
       setTimeout(() => {
        this.router.navigateByUrl('/'); 
       }, 3000);                 
      };
    },
    error => {
      this.isError = true;
      this.message = error;
    }));
  }
}
