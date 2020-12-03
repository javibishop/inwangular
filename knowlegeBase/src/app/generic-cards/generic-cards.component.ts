import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  // idInsuredToDelete: any;

  constructor() {}

  ngOnInit() {
    this.knowledges = this.knowledgesList;
  }

  // changeInsuredPeople($event){
  //   this.knowledges = $event;
  //   this.changeEmitter.emit(this.knowledges);
  // }

  // showModalDelete(value: any) {
  //   this.idInsuredToDelete = value;
  //   this.showModal = true;
  // }

  deleteCard(id?) {
    const idx = this.knowledges.findIndex((elem) => {
      return elem.id === id;
    });
    this.knowledges.splice(idx, 1);
    this.changeEmitter.emit(this.knowledges);
    this.showModal = false;
  }

  receivedOutput(id) {
    this.deleteCard(id);
    this.objEmit.emit(id);
  }

  removeCard(){ //(sender) {

  }
}
