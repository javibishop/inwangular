import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-generic-cards',
  templateUrl: './generic-cards.component.html',
  styleUrls: ['./generic-cards.component.scss']
})
export class GenericCardsComponent implements OnInit {

  @Input() knowledgesList: any = [];
  @Output() changeEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() objEmit: EventEmitter<any> = new EventEmitter();

  isFlipped = false;
  isInputVisible = false;
  showModal = false;
  knowledges = [];
  knowToDelete: any;
  subscriptions = [];
  user;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.knowledges = this.knowledgesList;

    this.user = JSON.parse(localStorage.getItem('currentUser')) as any;
  }

  changeKnow($event) {
    this.knowledges = $event;
    this.changeEmitter.emit(this.knowledges);
  }

  showModalDelete(value: any) {
    this.knowToDelete = value;
    this.showModal = true;
  }

  deleteCard(id?) {
    const idx = this.knowledges.findIndex((elem) => {
      return elem.id === id;
    });
    this.knowledges.splice(idx, 1);
    this.showModal = false;
  }

  removeCard() {
    this.subscriptions.push(this.userService.removeConocimiento(this.user.id, this.knowToDelete).subscribe());
    this.deleteCard(this.knowToDelete.id);
    this.objEmit.emit(this.knowToDelete.id);
  }
}
