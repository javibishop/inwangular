import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  providers: [UsuarioService],
})
export class ListaComponent implements OnInit {
  usuarios: any;

  constructor(private usuarioService: UsuarioService) {
    console.log('usuarios lista')
   }

  ngOnInit() {
    this.usuarioService.getUsers().subscribe(result => {
      this.usuarios = result;
    });

    this.usuarioService.addUser('papa', 'blanca');
  }

}
