import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SinginComponent } from "./singin/singin.component";
import { RegisterComponent } from "./register/register.component";
import { RouterModule, Routes } from "@angular/router";
import { ListaComponent } from "./lista/lista.component";
import { RandomComponent } from '../random/random.component';
import { RandomService } from '../service/random.service';
// import { UsuarioService } from "./usuario.service";

// rutas del modulo de usuarios.
const routes: Routes = [
  { path: "singin", component: SinginComponent },
  { path: "register", component: RegisterComponent },
  { path: "lista", component: ListaComponent },
  { path: "", component: SinginComponent },
];
// modulo de usuarios que se carga solamente cuando se ingresa a los path q son de usuarios.
// esto se maneja en  { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosModule' }
// con esto solo cargamos el modulo si se accede a algun componente.
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [SinginComponent, RegisterComponent, ListaComponent]
})
export class UsuariosModule {
  constructor() {
    console.log("modulo usuarios");
  }
}
