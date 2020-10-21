import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuarios/usuario.service';

@Component({
  selector: 'app-componente1',
  templateUrl: './componente1.component.html',
  styleUrls: ['./componente1.component.css']
})
export class Componente1Component implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getUsers().subscribe( (r: any) => this.usuarioService.addUser(r.nombre, r.apellido));

    this.usuarioService.addUser('papa', 'blanca');
  }

}
