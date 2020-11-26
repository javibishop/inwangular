import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generic-cards',
  templateUrl: './generic-cards.component.html',
  styleUrls: ['./generic-cards.component.scss']
})
export class GenericCardsComponent implements OnInit {
  // @Input() model: any = '';

  @Input() knowledgesList: any = [];
  @Output() changeEmitter: EventEmitter<any> = new EventEmitter<any>();

  isFlipped = false;
  isInputVisible = false;
  showModal = false;
  // insuredPeople = [];
  knowledges = [];
  idInsuredToDelete: any;

  changeInsuredPeople($event){
    this.knowledges = $event;
    this.changeEmitter.emit(this.knowledges);
  }

  showModalDelete(value: any) {
    this.idInsuredToDelete = value;
    this.showModal = true;
  }

  deleteInsured() {
    const idx = this.knowledges.findIndex((elem) => {
      return elem.id === this.idInsuredToDelete;
    });
    this.knowledges.splice(idx, 1);
    this.changeEmitter.emit(this.knowledges);
    this.showModal = false;
  }

  constructor() {}

  ngOnInit() {
    this.knowledges = this.knowledgesList;
  }
}
