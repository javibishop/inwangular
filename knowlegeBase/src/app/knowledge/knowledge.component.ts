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

                this.list = {
                  E_LISTA_DEPENDIENTES: [
                    {
                      'E_LISTA_DEPENDIENTES|EDITAR': 'false',
                      'E_LISTA_DEPENDIENTES|ELIMINAR': 'false',
                      'E_LISTA_DEPENDIENTES|E_DEPENDIENTE_APELLIDORAZONSOCIAL': 'Doe',
                      'E_LISTA_DEPENDIENTES|E_DEPENDIENTE_FECHANACIMIENTO': '14/11/1961',
                      'E_LISTA_DEPENDIENTES|E_DEPENDIENTE_LUGARNACIMIENTO': 'Antofagasta',
                      'E_LISTA_DEPENDIENTES|E_DEPENDIENTE_NOMBRE': 'John',
                      'E_LISTA_DEPENDIENTES|E_DEPENDIENTE_NUMEROFISCAL': 'RFC',
                      'E_LISTA_DEPENDIENTES|E_DEPENDIENTE_PARENTEZCO': 'Titular',
                      'E_LISTA_DEPENDIENTES|E_DEPENDIENTE_SEGUNDOAPELLIDO': '',
                      'E_LISTA_DEPENDIENTES|E_DEPENDIENTE_SEXO': 'Hombre',
                      'E_LISTA_DEPENDIENTES|E_DEPENDIENTE_TELEFONO': '0123456789',
                      'E_LISTA_DEPENDIENTES|E_DEPENDIENTE_EMAIL': 'asd@asd.com',
                      'E_LISTA_DEPENDIENTES|MONTO_CON': '1500,78954',
                      'E_LISTA_DEPENDIENTES|MONTO_SIN': '1500,78954',
                    }
                  ],
                };
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
      this.knowledges.forEach(e => {
        e['EDITAR'] = 'true';
        e['ELIMINAR'] = 'false';
      });
      // console.log(this.knowledges);
    }));
  }
}
