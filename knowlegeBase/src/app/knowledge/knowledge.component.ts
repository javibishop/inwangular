import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
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

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService ) {
              }

  ngOnDestroy(): void {
    this.subscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    console.log(id);
    this.subscriptions.push(this.userService.getConocimientos(id).subscribe( r => {
      this.knowledges = r as [ConocimientoUsuario];
    }));
  }
}
