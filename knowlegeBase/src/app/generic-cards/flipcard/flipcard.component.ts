import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'flip-card',
  templateUrl: './flipcard.component.html',
  styleUrls: ['./flipcard.component.scss'],
})
export class FlipCardComponent implements OnInit {
  isFlipped = false;
  isNewFlipped = false;
  fecNacimientoValue;
  showErrorMessage = false;

  currentAseg: any = {};

  @Input() knowledges: any;
  @Output() changeInsuredPeopleEmitter = new EventEmitter();
  @Output() deleteInsuredEmitter = new EventEmitter();

  inputDateConfig = {
    dayMinLength: 1,
    dayMaxLength: 2,
    monthMinLength: 1,
    monthMaxLength: 2,
    yearMinLength: 4,
    yearMaxLength: 4,
    dayLabel: '',
    monthLabel: '',
    yearLabel: '',
    dayLabelClass: 'label',
    monthLabelClass: 'label',
    yearLabelClass: 'label',
    legend: 'Fecha de nacimiento',
    dayPlaceHolder: 'DD',
    monthPlaceHolder: 'MM',
    yearPlaceHolder: 'YYYY',
    invalidMessage: 'INGRESE UNA FECHA VÁLIDA',
    invalidMinDate: 'INGRESE UNA FECHA VÁLIDA',
    invalidMaxDate: 'INGRESE UNA FECHA VÁLIDA',
    invalidRegEx: 'INGRESE UNA FECHA VÁLIDA',
    invalidDayLength: 'Tamaño inconrrecto del día',
    invalidMonthLength: 'Tamaño inconrrecto del mes',
    invalidYearLength: 'Tamaño inconrrecto del año',
  };

  getFechaNacimiento(event: any) {
    if (event) {
      this.currentAseg['E_LISTA_DEPENDIENTES|E_DEPENDIENTE_FECHANACIMIENTO'] = event;
    }
  }

  saveCard(e?) {
    if (!this.isValid()) {
      this.showErrorMessage = true;
      return;
    }
    if (e >= 0) {
      this.knowledges[e] = this.currentAseg;
    } else {
      this.currentAseg.id = gen.next().value;
      this.knowledges = [...this.knowledges, this.currentAseg];
    }
    this.flipCard(e);
    this.changeInsuredPeopleEmitter.emit(this.knowledges);
  }

  flipCard(e?) {
    if (e >= 0) {
      this.isFlipped = !this.isFlipped;
      this.knowledges[e].flipped = !this.knowledges[e].flipped;
      this.currentAseg = { ...this.knowledges[e] };
    } else {
      this.isNewFlipped = !this.isNewFlipped;
      this.currentAseg = {
        'EDITAR': 'true',
        'ELIMINAR': 'true',
        'E_LISTA_DEPENDIENTES|E_DEPENDIENTE_NOMBRE': '',
        'E_LISTA_DEPENDIENTES|E_DEPENDIENTE_SEXO': 'Hombre',
        'E_LISTA_DEPENDIENTES|E_DEPENDIENTE_PARENTEZCO': 'Cónyuge',
        birthDate: {},
      };
    }
    this.showErrorMessage = false;
  }


  deleteModal(i) {
    this.deleteInsuredEmitter.emit(this.knowledges[i].id);
  }

  isValid() {
    return (
      this.currentAseg['E_LISTA_DEPENDIENTES|E_DEPENDIENTE_NOMBRE'] &&
      this.currentAseg['E_LISTA_DEPENDIENTES|E_DEPENDIENTE_FECHANACIMIENTO'] &&
      this.currentAseg['E_LISTA_DEPENDIENTES|E_DEPENDIENTE_PARENTEZCO'] &&
      this.currentAseg['E_LISTA_DEPENDIENTES|E_DEPENDIENTE_SEXO']
    );
  }

  constructor() {}

  ngOnInit() {
    for (let i = 0; i < this.knowledges.length; i++) {
      this.knowledges[i].flipped = false;
      this.knowledges[i].id = gen.next().value;
    }
  }
}

function* idMaker() {
  var index = 0;
  while(true)
      yield index++;
}
var gen = idMaker();
