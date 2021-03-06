import { Input, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { KnowledgeService } from "src/app/service/knowledge.service";
import { UserService } from "src/app/service/user.service";
import { ConocimientoUsuario } from "src/app/_models/ConocimientoUsuario";

@Component({
  selector: 'flip-card',
  templateUrl: './flipcard.component.html',
  styleUrls: ['./flipcard.component.scss'],
})
export class FlipCardComponent implements OnInit {
  @Output() objEmit: EventEmitter<any> = new EventEmitter();
  @Output() deleteKnowEmitter = new EventEmitter();
  @Output() changeKnowEmitter = new EventEmitter();

  isFlipped = false;
  isNewFlipped = false;
  subscriptions = [];
  user;
  errorMsg = null;
  showModal = false;
  idNewCard: any;

  currentKnow: any = {};

  @Input() knowledges: any;

  tecnologias = [];

  constructor(private userService: UserService,
    private knowledgeService: KnowledgeService) { }

  ngOnInit() {
    if (this.knowledges !== undefined && this.knowledges !== null) {
      for (let i = 0; i < this.knowledges.length; i++) {
        this.knowledges[i].flipped = false;
        this.knowledges[i].id = gen.next().value;
      }
    }

    this.knowledgeService.getAll().subscribe(data => {
      this.tecnologias = data;
    })

    this.user = JSON.parse(localStorage.getItem('currentUser')) as any;
  }

  saveCard(e?) {
    if (!this.isValid()) {
      this.errorMsg = 'Todos los campos son requeridos!';
      return;
    }
    this.errorMsg = null;

    const objKnowledge = this.currentKnow as ConocimientoUsuario;
    this.subscriptions.push(this.userService.addConocimiento(this.user.id, objKnowledge).subscribe(
      () => {
        if (e >= 0) {
          this.knowledges[e] = this.currentKnow;
        } else {
          this.currentKnow.flipped = false;
          this.currentKnow.id = gen.next().value;
          if (this.knowledges !== undefined && this.knowledges !== null) {
            this.knowledges = [...this.knowledges, this.currentKnow];
          } else {
            this.knowledges = [];
            this.knowledges.push(this.currentKnow);
          }
          this.flipCard(e);
          this.changeKnowEmitter.emit(this.knowledges);
          this.errorMsg = null;
        }
      },
      error => {
        this.errorMsg = error;
      }
    ));
  }

  removeCard() {
    const objKnowledge = new ConocimientoUsuario();
    objKnowledge.conocimiento.nombre = this.currentKnow.conocimiento.nombre;
    objKnowledge.nivel = this.currentKnow.nivel;
    this.subscriptions.push(this.userService.removeConocimiento(this.user.id, objKnowledge).subscribe());
    this.objEmit.emit(this.currentKnow.id);
  }

  flipCard(e?) {
    if (e >= 0) {
      this.isFlipped = !this.isFlipped;
      this.knowledges[e].flipped = !this.knowledges[e].flipped;
      this.currentKnow = { ...this.knowledges[e] };
    } else {
      this.idNewCard = gen.next().value;
      this.isNewFlipped = !this.isNewFlipped;
      this.currentKnow = {
        'conocimiento': { 'nombre': '' },
        'nivel': 0,
      };
    }
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

  deleteModal(objKnow) {
    this.deleteKnowEmitter.emit(objKnow);
  }

  getTecnologies(): any[] {

    let tecnology: any[] = [];

    if (this.knowledges && this.knowledges.length > 0) {
      this.tecnologias.forEach(tecnologia => {
        if (this.knowledges.find(x => x.conocimiento.nombre == tecnologia.nombre) === undefined) {
          if (tecnologia.nombre !== '') {
            tecnology.push(tecnologia);
          }
        }
      })
    }
    else {
      tecnology = this.tecnologias;
    }

    return tecnology;
  }
}

function* idMaker() {
  var index = 0;
  while (true)
    yield index++;
}
var gen = idMaker();