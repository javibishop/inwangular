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
  isFlipped = false;
  isNewFlipped = false;
  showErrorMessage = false;
  subscriptions = [];
  user;

  currentKnow: any = {};

  @Input() knowledges: any;

  tecnologias = [{ description: 'C-Sharp' }, { description: 'NET.CORE' }, { description: 'Angular' },
  { description: 'JavaScript' }, { description: 'Delphi' }, { description: 'Css' }];

  constructor(private userService: UserService) { }

  ngOnInit() {
    for (let i = 0; i < this.knowledges.length; i++) {
      this.knowledges[i].flipped = false;
      this.knowledges[i].id = gen.next().value;
    }
    this.user = JSON.parse(localStorage.getItem('currentUser')) as any;
  }

  saveCard(e?) {
    if (!this.isValid()) {
      this.showErrorMessage = true;
      return;
    }
    if (e >= 0) {
      this.knowledges[e] = this.currentKnow;
    } else {
      this.knowledges = [...this.knowledges, this.currentKnow];

      this.currentKnow.nivel = 0;
      const objKnowledge = this.currentKnow as ConocimientoUsuario;
      this.subscriptions.push(this.userService.addConocimiento(this.user.id, objKnowledge).subscribe());
    }
    this.flipCard(e);

  }

  flipCard(e?) {
    if (e >= 0) {
      this.isFlipped = !this.isFlipped;
      this.knowledges[e].flipped = !this.knowledges[e].flipped;
      this.currentKnow = { ...this.knowledges[e] };
    } else {
      this.isNewFlipped = !this.isNewFlipped;
      this.currentKnow = {
        'conocimiento': { 'Nombre': '' },
        'nivel': '0',
      };
    }
    this.showErrorMessage = false;
  }

  isValid() {
    return (
      this.currentKnow.conocimiento.Nombre &&
      this.currentKnow.nivel
    );
  }

  onChangeTecnologia(newVal) {
    this.currentKnow.conocimiento['Nombre'] = newVal;
  }

  onChangeNivel(newVal) {
    this.currentKnow['nivel'] = newVal;
  }
}

function* idMaker() {
  var index = 0;
  while (true)
    yield index++;
}
var gen = idMaker();


