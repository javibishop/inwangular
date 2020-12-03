import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../_models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  subscriptions = [];
  user = null; //new User();

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    if(id !== null && id !== ''){
      this.subscriptions.push(this.userService.getById(id).subscribe( r => {
        this.user = r as User;
      }));
    }
  }

  onSaveClick(){
    this.subscriptions.push(this.userService.update(this.user).subscribe());
  }
}
