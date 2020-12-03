import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/_models';
import { ConocimientoUsuario } from 'src/app/_models/ConocimientoUsuario';

@Component({
  selector: 'flip-card',
  templateUrl: './flipcard.component.html',
  styleUrls: ['./flipcard.component.scss'],
})
export class FlipCardComponent implements OnInit {
  @Output() objEmit: EventEmitter<any> = new EventEmitter();

  isFlipped = false;
  isNewFlipped = false;
  // showErrorMessage = false;
  subscriptions = [];
  user;
  errorMsg = null;

  currentKnow: any = {};

  @Input() knowledges: any;

  tecnologias = [{ description: 'C-Sharp' }, { description: 'NET.CORE' }, { description: 'Angular' },
  { description: 'JavaScript' }, { description: 'Delphi' }, { description: 'Css' }];

  constructor(private userService: UserService) { }

  ngOnInit() {
    if (this.knowledges !== undefined && this.knowledges !== null) {
      for (let i = 0; i < this.knowledges.length; i++) {
        this.knowledges[i].flipped = false;
        this.knowledges[i].id = gen.next().value;
      }
    }
    this.user = JSON.parse(localStorage.getItem('currentUser')) as any;
  }

  saveCard(e?) {
    if (!this.isValid()) {
    //  this.showErrorMessage = true;
      this.errorMsg = 'Todos los campos son requeridos!';
      return;
    }
    //this.showErrorMessage = false;
    this.errorMsg = null;

    const objKnowledge = this.currentKnow as ConocimientoUsuario;
    this.subscriptions.push(this.userService.addConocimiento(this.user.id, objKnowledge).subscribe(
      () => {
        if (e >= 0) {
          this.knowledges[e] = this.currentKnow;
        } else {
          if (this.knowledges !== undefined && this.knowledges !== null) {
            this.knowledges = [...this.knowledges, this.currentKnow];
          } else {
            this.knowledges = [];
            this.knowledges.push(this.currentKnow);
          }
          this.flipCard(e);
          this.errorMsg = null;
        }
      },
      error => {
        this.errorMsg = error;
      }
    ));
  }

  removeCard(sender) {
    const objKnowledge = new ConocimientoUsuario();
    objKnowledge.conocimiento.nombre = sender.conocimiento.nombre;
    objKnowledge.nivel = sender.nivel;
    this.subscriptions.push(this.userService.removeConocimiento(this.user.id, objKnowledge).subscribe());
    this.objEmit.emit(sender.id);
  }

  flipCard(e?) {
    if (e >= 0) {
      this.isFlipped = !this.isFlipped;
      this.knowledges[e].flipped = !this.knowledges[e].flipped;
      this.currentKnow = { ...this.knowledges[e] };
    } else {
      this.isNewFlipped = !this.isNewFlipped;
      this.currentKnow = {
        'conocimiento': { 'nombre': '' },
        'nivel': 0,
      };
    }
   // this.showErrorMessage = false;
    this.errorMsg = null;
  }

  isValid() {
    return (
      this.currentKnow.conocimiento.nombre &&
      this.currentKnow.nivel >= 0
    );
  }

  onChangeTecnologia(newVal) {
    this.currentKnow.conocimiento['nombre'] = newVal;
  }

  onChangeNivel(newVal) {
    this.currentKnow['nivel'] = Number(newVal);
  }

  ratingAddClick(clickObj: any): void {
    this.currentKnow.nivel = Number(clickObj.rating);
  }

  ratingEditClick(clickObj: any): void {
    const i = this.knowledges.findIndex(e => e.id === clickObj.id);
    this.knowledges[i].nivel = Number(clickObj.rating);

    const objKnowledge = new ConocimientoUsuario();
    objKnowledge.conocimiento.nombre = this.knowledges[i].conocimiento.nombre;
    objKnowledge.nivel = Number(this.knowledges[i].nivel);
    this.subscriptions.push(this.userService.editConocimiento(this.user.id, objKnowledge).subscribe());
  }
}

function* idMaker() {
  var index = 0;
  while (true)
    yield index++;
}
var gen = idMaker();


