import { Conocimiento } from './conocimiento';

export class ConocimientoUsuario {
  conocimiento: Conocimiento;
  nivel: number;

  constructor(){
    this.conocimiento = new Conocimiento();
  }
}