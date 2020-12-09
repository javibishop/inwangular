import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../_models';
import { ConocimientoUsuario } from '../_models/ConocimientoUsuario';

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.css']
})
export class KnowledgeComponent implements OnInit, OnDestroy {

  knowledges: any;
  subscriptions = [];
  list: any = {};
  user;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService ) {
              }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  ngOnInit() {
    this.knowledges = this.activatedRoute.snapshot.data.knows;
    const id = this.activatedRoute.snapshot.params.id;

    this.subscriptions.push(this.userService.getById(id).subscribe( u => {
      this.user = u as User;
    }));
  }

  receivedOutput(value) {
    const id = this.activatedRoute.snapshot.params.id;
    this.subscriptions.push(this.userService.getConocimientos(id).subscribe( r => {
      this.knowledges = r as [ConocimientoUsuario];
    }));
  }

  changeKnow($event) {
    this.knowledges = $event;
  }
}
